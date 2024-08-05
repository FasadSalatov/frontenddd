import { Icons, ListTaskItem, Logo, SubTitle, Title, WrapperPage } from "../components";
import { airdropListTaskItems, listTaskItems } from "../constants";
import { useTonConnectUI, toUserFriendlyAddress } from '@tonconnect/ui-react';
import axios from "axios";
import { useState, useEffect } from "react";

const AirDropPage = () => {
    const [wallet, setWallet] = useTonConnectUI();
    const [isWallet, setIsWallet] = useState(!!wallet.wallet);
    const tg = window.Telegram.WebApp;
    const userId = tg?.initDataUnsafe?.user?.id;

    const connectWallets = async () => {
        try {
            const connectedWallet = await wallet.connectWallet();
            setIsWallet(true);

            await axios.post('http://localhost:5000/api2/user/update-wallet', {
                user_id: userId,
                wallet: toUserFriendlyAddress(connectedWallet.account.address)
            });
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    const disconnectWallet = async () => {
        try {
            await wallet.disconnect();
            setIsWallet(false);
        } catch (error) {
            console.error("Error disconnecting wallet:", error);
        }
    };

    useEffect(() => {
        setIsWallet(!!wallet.wallet);
    }, [wallet.wallet]);

    return (
        <WrapperPage>
            <Logo width={200} />
            <Title fontSize="5xl">Airdrop tasks</Title>
            <SubTitle>
                The listing is on its way. The tasks will appear below. Complete them to participate in the airdrop.
            </SubTitle>
            <div className="w-full mt-4">
                <h2 className="font-semibold mb-3 text-white text-2xl text-left">Connect your wallet</h2>
                {airdropListTaskItems.map((task) => (
                    <div 
                        key={task.id} 
                        onClick={async () => {
                            if (!wallet.wallet) {
                                await connectWallets();
                            } else {
                                await disconnectWallet();
                            }
                        }} 
                        className="bg-[#0B1B28] rounded-lg py-5 px-5 flex justify-between gap-2 items-center mt-3"
                    >
                        <div className="flex items-center">
                            <div className="min-w-[40px]">{task.icon}</div>
                            <h3 className="text-white font-semibold line-clamp-1">{task.title}</h3>
                        </div>
                        {isWallet ? (
                            <div className="w-5 h-5 bg-custom-gradient rounded-full"></div>
                        ) : (
                            <div className="w-5 h-5 border-4 border-solid border-cyan-500 rounded-full"></div>
                        )}
                    </div>
                ))}
            </div>
        </WrapperPage>
    );
};

export default AirDropPage;
