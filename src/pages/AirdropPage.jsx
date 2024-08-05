import { Icons, ListTaskItem, Logo, SubTitle, Title, WrapperPage } from "../components";
import { airdropListTaskItems, listTaskItems } from "../constants";
import { useTonWallet, useTonAddress, useTonConnectUI,toUserFriendlyAddress } from '@tonconnect/ui-react';
import axios from "axios";
import {useState} from "react";
const AirDropPage = () => {
    const [wallet]   = useTonConnectUI()
    const [isWallet, setIsWallet] = useState(wallet.wallet)
    console.log(wallet?.wallet?.account?.address)
    const tg = window.Telegram.WebApp
    //const id = '286133104'
    const id = tg?.initDataUnsafe?.user?.id
    const connectWallets = async () => {
        console.log(1)

        const connectedWallet = await wallet.connectWallet()
        setIsWallet(true)
        await axios.post('https://telegrams.su/api/api/update-user-wallet', {
            user_id: id,
            wallet: toUserFriendlyAddress(wallet.wallet.account.address)
        })
    };
    const dissconnect = async () => {
        setIsWallet(false)
         await wallet.disconnect()
    };

    return (
        <WrapperPage>
            <Logo width={200} />
            <Title fontSize="5xl">Airdrop tasks</Title>

            <SubTitle>
                The listing is on its way. The tasks will appear below. Complete them to participate in the airdrop
            </SubTitle>
            <div className="w-full mt-4">
                <h2 className="font-semibold mb-3 text-white text-2xl text-left">Connect your wallet</h2>
                {airdropListTaskItems.map((task) => (
                    <div onClick={async () => {
                        if(!wallet.wallet){
                            await connectWallets()
                        } else {
                            await dissconnect()}}} className="bg-[#0B1B28]  rounded-lg py-5 px-5 flex justify-between gap-2 items-center mt-3">
                        <div className="flex items-center">
                            <div className="min-w-[40px]">{task.icon}</div>
                            <h3 className="text-white font-semibold line-clamp-1">{task.title}</h3>
                        </div>
                        {isWallet ? (
                            <div className="w-5 h-5 bg-custom-gradient rounded-full"></div>
                        ) : (
                            <div className="w-5 h-5  border-4 border-solid border-cyan-500 rounded-full"></div>
                        )}
                    </div>
                ))}
            </div>
        </WrapperPage>
    );
};

export default AirDropPage;
