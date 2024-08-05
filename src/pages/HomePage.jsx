import { Clicker, Icons, Notification, Ripple, WrapperPage } from "../components";
import { useState, useEffect } from "react";
import { Notcoin } from '../notcoin';
import { SubPage } from "./index.js";
import axios from 'axios';
import useBoostData from "../useBoostData.js";
import { getUserEnergyIncrease, getUserMultiTap, getUserFullEnergy, getUserData } from '../api';
const defaultEnergy = 2000;
const tg = window.Telegram.WebApp;
tg.expand();

const HomePage = () => {
    const [appState, setAppState] = useState();
    const [balance, setBalance] = useState(1500);
    const [energy, setEnergy] = useState(defaultEnergy);
    const [type, setType] = useState('notcoin');
    const [progress, setProgress] = useState(0);
    const [level, setLevel] = useState(1);
    const [maxLevel, setMaxLevel] = useState(3);
    const id = tg?.initDataUnsafe?.user?.id;


      const [boostData, setBoostData] = useState({
        fullEnergy: { available: 0, remainingMinutes: 0, count: 0 },
        multiTap: { level: 0, remainingMinutes: 0 },
        energyIncrease: { amount: 0, remainingMinutes: 0 }
      });
    
      const [userData, setUserData] = useState({
        user_id: 0,
        balance_personal: 0,
        balance_personal_today: 0,
        balance_friends: 0,
        rating: 0,
        limit: 0,
        friends_invited: 0,
        ref_link: '',
        wasted: 0,
        daily: true,
        wallet: ''
    });
      useEffect(() => {
        const fetchData = async () => {
          try {
            const [fullEnergyRes, multiTapRes, energyIncreaseRes, userDataRes] = await Promise.all([
              getUserFullEnergy(),
              getUserMultiTap(),
              getUserEnergyIncrease(),
              getUserData(1)  // Замените 1 на фактический user_id
            ]);
    
            setBoostData({
              fullEnergy: fullEnergyRes.data[0] || { available: 0, remainingMinutes: 0, count: 0 },
              multiTap: multiTapRes.data[0] || { level: 0, remainingMinutes: 0 },
              energyIncrease: energyIncreaseRes.data[0] || { amount: 0, remainingMinutes: 0 }
            });
    
            setUserData(userDataRes.data || {});
          } catch (error) {
            console.error("Error fetching data", error);
          }
        };
    
        fetchData();
      }, []);


      
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

    useEffect(() => {
        axios.get(`http://localhost:8799/api/user-data?user_id=${id}`).then((resp) => {
            const user = resp.data;
            setAppState(user);
            setBalance(user.balance_personal);
            setEnergy(user.limit);
            getType();
            calculateProgress();
        });
    }, [id]);

    useEffect(() => {
        getType();
        calculateProgress();
    }, [balance]);

    const onHandleChangeEnergyAndCoin = () => {
        if (energy > 0) {
            setEnergy((prev) => prev - 1);
            axios.post('http://localhost:8799/api/update-personal-balance', {
                user_id: id,
                amount: 1,
                daily: false, 
                limit: 1
            }).then((resp) => {
                setBalance(resp.data.personal_balance);
            });
        }
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
            <Notification coin={userData.balance_personal} boostData={boostData} />
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
        </WrapperPage>
    );
};

export default HomePage;
