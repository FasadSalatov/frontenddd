import React, { useEffect, useState } from 'react';
import { Icons, Title } from '..';
import axios from 'axios';

const Notification = () => {
    const [coin, setCoin] = useState(0);
    const [boostData, setBoostData] = useState({
        multiTap: { level: 0 },
        fullEnergy: false,
        energyIncrease: 0
    });

    // Получение ID пользователя из Telegram WebApp
    const tg = window.Telegram.WebApp;
    const userId = tg?.initDataUnsafe?.user?.id;

    useEffect(() => {
        // Получение данных пользователя из API
        const fetchUserData = async () => {
            try {
                if (userId) {
                    const response = await axios.get(`/api2/user/${userId}`);
                    const userData = response.data;
                    setCoin(userData.balance);
                    setBoostData({
                        multiTap: { level: userData.boost_click ? 1 : 0 },
                        fullEnergy: userData.max_energy === 3000,
                        energyIncrease: userData.boost_energy ? 1000 : 0
                    });
                }
            } catch (error) {
                console.error("Ошибка при получении данных пользователя:", error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const { multiTap, fullEnergy, energyIncrease } = boostData;

    // Пример вычислений для отображения на основе уровня мультитапа и других параметров
    const coinsToLevelUp = multiTap.level * 5000; // Допустим, что требуется 5000 монет на каждый уровень
    const profitPerHour = multiTap.level * 133; // Допустим, что каждый уровень добавляет 133 монеты в час

    return (
        <div className="flex flex-col items-center gap-10">
            <div className="flex gap-2">
                <div
                    style={{
                        background: "url(../../../../public/img/bgForCoinMiniCart/bgCoinCard.svg) center/cover",
                    }}
                    className="w-1/3 rounded-[20px] flex flex-col items-center justify-center py-2 px-3"
                >
                    <span className="text-[#ffffff99] text-xs whitespace-nowrap">Earn per tap</span>
                    <span className="flex items-center justify-center text-white gap-1 font-semibold">
                        <Icons.CoinBMiniIcon />
                        +1
                    </span>
                </div>
                <div
                    style={{
                        background: "url(../../../../public/img/bgForCoinMiniCart/bgCoinCard.svg) center/cover",
                    }}
                    className="w-1/3 rounded-[20px] flex flex-col items-center justify-center py-2  px-3"
                >
                    <span className="text-[#ffffff99] text-xs whitespace-nowrap">Coins to lvl up</span>
                    <span className="flex items-center justify-center text-white gap-1 font-semibold">
                        {coinsToLevelUp}K
                    </span>
                </div>
                <div
                    style={{
                        background: "url(../../../../public/img/bgForCoinMiniCart/bgCoinCard.svg) center/cover",
                    }}
                    className="w-1/3 rounded-[20px] flex flex-col items-center justify-center py-2  px-3"
                >
                    <span className="text-[#ffffff99] text-xs whitespace-nowrap">Profit per hour</span>
                    <span className="flex items-center justify-center text-white gap-1 font-semibold">
                        <Icons.CoinBMiniIcon />
                        {profitPerHour}
                    </span>
                </div>
            </div>
            <div className="flex gap-2 items-center text-3xl text-white">
                <Icons.CoinBigIcon />
                <Title fontSize="3xl">{coin}</Title>
            </div>
        </div>
    );
};

export default Notification;
