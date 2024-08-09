import { Clicker, Icons, Notification, Ripple, WrapperPage } from "../components";
import { useState, useEffect } from "react";
import { Notcoin } from '../notcoin';
import axios from 'axios';

const defaultEnergy = 2000;
const tg = window.Telegram.WebApp;
tg.expand();

const HomePage = ({ tgId }) => {  // Access tgId from props
    const [balance, setBalance] = useState(1500);
    const [energy, setEnergy] = useState(defaultEnergy);
    const [type, setType] = useState('notcoin');
    const [progress, setProgress] = useState(0);
    const [level, setLevel] = useState(1);
    const [maxLevel, setMaxLevel] = useState(3);
    const id = tgId || tg?.initDataUnsafe?.user?.id;  // Use tgId if available

    const [boostData, setBoostData] = useState({
        fullEnergy: { available: 0, remainingMinutes: 0, count: 0 },
        multiTap: { level: 0, remainingMinutes: 0 },
        energyIncrease: { amount: 0, remainingMinutes: 0 }
    });

    const [userData, setUserData] = useState({
        user_id: id,
        balance: 0,
        coins_per_day: 0,
        wallet: ''
    });

    const fetchData = async () => {
        try {
            const userDataRes = await axios.get(`/api2/user/${id}`);
            const user = userDataRes.data;

            setUserData(user);
            setBalance(user.balance);
            setEnergy(user.coins_per_day);
            getType();
            calculateProgress();
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const getType = () => {
        if (balance >= 500000) {
            setType('notcoin2'); // Epic
            setLevel(3);
        } else if (balance >= 100000) {
            setType('notcoin'); // Pro
            setLevel(2);
        } else if (balance < 50000) {
            setType('notcoin3'); // Standard
            setLevel(1);
        }
        return type;
    };

    const calculateProgress = () => {
        let progress = 0;
        if (balance >= 500000) {
            progress = ((balance - 500000) / 500000) * 100; // Прогресс до следующего уровня после Epic
        } else if (balance >= 50000) {
            progress = ((balance - 50000) / 450000) * 100; // Прогресс в диапазоне Pro до Epic
        } else {
            progress = (balance / 50000) * 100; // Прогресс в диапазоне Standard до Pro
        }
        setProgress(progress);
    };

    const onHandleChangeEnergyAndCoin = () => {
        if (energy > 0) {
            axios.get(`/api2/user/click/${id}`)
                .then((resp) => {
                    setBalance(prevBalance => prevBalance + 1);  // Увеличиваем баланс на 1
                    setEnergy(prevEnergy => prevEnergy - 1);  // Уменьшаем энергию на 1
                })
                .catch(error => console.error("Error updating user data", error));
        }
    };

    const handleBoostClick = () => {
        axios.get(`/api2/user/boost-click/${id}`)
            .then(() => {
                fetchData(); // Обновляем данные пользователя
            })
            .catch(error => console.error("Error boosting click", error));
    };

    const handleBoostEnergy = () => {
        axios.get(`/api2/user/boost-energy/${id}`)
            .then(() => {
                fetchData(); // Обновляем данные пользователя
            })
            .catch(error => console.error("Error boosting energy", error));
    };

    const handleFullEnergy = () => {
        axios.get(`/api2/user/full-energy/${id}`)
            .then(() => {
                fetchData(); // Обновляем данные пользователя
            })
            .catch(error => console.error("Error filling energy", error));
    };

    const getLevelName = () => {
        if (type === 'notcoin3') {
            return 'Standard';
        } else if (type === 'notcoin') {
            return 'Pro';
        } else if (type === 'notcoin2') {
            return 'Master';
        }
        return 'standard'; // Значение по умолчанию
    };

    return (
        <WrapperPage style={{ overflowX: 'hidden' }}>
            <Notification coin={userData.balance} boostData={boostData} />
            <div className="max-w-96 flex flex-col items-center justify-center">
                <Notcoin
                    balance={getType}
                    canIClickPlease={true}
                    sleep={false}
                    funMode={false}
                    clickValue={1}
                    cooldown={0}
                    onHandleChangeEnergyAndCoin={onHandleChangeEnergyAndCoin}
                    handleClick={onHandleChangeEnergyAndCoin}
                />
                <div className="flex items-center" style={{ flexDirection: 'column', width: '100%', marginTop: '-15vh' }}>
                    <p className="flex text-white text-2xl items-center pb-5 mt-3">
                        <span className="font-bold">{energy}</span>
                        <span className="font-bold">/{defaultEnergy}</span>
                        <Icons.LightningIcon />
                    </p>

                    <div className="w-full flex justify-between" style={{ width: '90%' }}>
                        <p className="text-white">{getLevelName()}</p>
                        <span className="text-white">{level}/{maxLevel}</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2.5 mb-4 overflow-hidden" style={{ width: '90%' }}>
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                    </div>
                </div>
            </div>
        </WrapperPage>
    );
};

export default HomePage;
