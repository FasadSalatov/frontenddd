import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import icon from "../components/GlobalComponents/img/coin.png";

// API Functions
const getUserData = async (userId) => {
    try {
        const response = await axios.get(`/api2/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data", error);
        throw error;
    }
};

const updatePersonalBalance = async (userId, stake, daily, limit, referralId = null, isPremium = false) => {
    try {
        const requestData = {
            chatId: userId,
            referralId: referralId,  // Указываем referralId
            premium: isPremium,       // Указываем premium статус
            stake: stake,
            daily: daily,
            limit: limit
        };
        const response = await axios.post(`/api2/user/stake`, requestData);
        return response.data;
    } catch (error) {
        console.error("Error updating personal balance", error);
        throw error;
    }
};

// StakingPage Component
const StakingPage = () => {
    const tg = window.Telegram.WebApp;
    const id = tg?.initDataUnsafe?.user?.id; // Получаем Telegram ID пользователя
    const referralId = tg?.initDataUnsafe?.user?.referralId || "defaultReferralId"; // Укажите значение по умолчанию, если referralId отсутствует
    const isPremium = tg?.initDataUnsafe?.user?.isPremium || false; // Укажите значение по умолчанию, если isPremium отсутствует

    const [userData, setUserData] = useState({
        user_id: id,
        balance: 0,
        coins_per_day: 0,
        balance_friends: 0,
        rating: 0,
        limit: 0,
        friends_invited: 0,
        ref_link: "",
        wasted: 0,
        daily: true,
        wallet: ""
    });
    const [inputStake, setInputStake] = useState('');
    const [myStake, setMyStake] = useState(0);
    const [timeEstimate, setTimeEstimate] = useState(8);
    const [isStaked, setIsStaked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getUserData(id);
                setUserData(data);
                setMyStake(data.stake); // Подтягиваем данные о текущем стейке
                setTimeEstimate(8); // Примерное время ожидания
            } catch (error) {
                setError('Error fetching data');
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchData();
        }
    }, [id]);

    const handleStake = async () => {
        if (inputStake > 0 && inputStake <= userData.balance) {
            setLoading(true);
            setError(null);
            try {
                await updatePersonalBalance(userData.user_id, inputStake, userData.daily, userData.limit, referralId, isPremium);
                setMyStake(myStake + parseInt(inputStake));
                setUserData(prevState => ({
                    ...prevState,
                    balance: prevState.balance - inputStake
                }));
                setIsStaked(true);
            } catch (error) {
                setError('Error staking');
                console.error("Error staking", error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <PageWrapper>
            <StakeInfo>My stake: <Spa><img src={icon} width='12px'/>{myStake}</Spa></StakeInfo>
            <Container>
                {loading ? (
                    <LoadingMessage>Loading...</LoadingMessage>
                ) : (
                    <>
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                        <Input 
                            type="number" 
                            value={inputStake} 
                            onChange={(e) => setInputStake(e.target.value)} 
                            max={userData.balance}
                            disabled={isStaked}
                        />
                        <TimeEstimate>Estimated waiting time {timeEstimate} minutes</TimeEstimate>
                        <IconContainer>
                            <img src={icon} width='52px'/>
                            <Amount>{userData.balance}</Amount>
                        </IconContainer>
                        <Button onClick={handleStake} disabled={isStaked || inputStake <= 0 || inputStake > userData.balance}>Stake</Button>
                    </>
                )}
            </Container>
        </PageWrapper>
    );
};

// Styled Components
const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 65vh;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
`;

const Input = styled.input`
    width: 120%;
    color: white;
    padding: 10px;
    margin: 10px 0;
    background-color: rgba(11, 27, 40, 0.7);
    border-radius: 5px;
    text-align: center;
    font-size: 1.2em;

    &:focus {
        border: none !important;
    }
`;

const Spa = styled.div`
    display: flex;
    height: 12px;
    align-items: center;
    gap: 10px;
`;

const Button = styled.button`
    width: 120%;
    padding: 10px;
    margin-top: 15vh;
    background-color: ${props => (props.disabled ? '#ccc' : 'rgba(222, 166, 131, 1)')};
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

    &:hover {
        background-color: ${props => (props.disabled ? '#ccc' : 'rgba(222, 166, 131, 1)')};
    }
`;

const StakeInfo = styled.div`
    margin-bottom: 10px;
    font-size: 0.8em;
    color: #007bff;
    margin-top: -25%;
    width: 105%;
    display: flex;
    color: rgba(255, 230, 219, 1);
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    padding: 10px;
`;

const TimeEstimate = styled.div`
    margin: 0;
    color: #777;
    font-size: 0.7em;
`;

const IconContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
`;

const Amount = styled.div`
    margin-top: 10%;
    font-size: 2em;
    font-weight: bold;
    color: white;
`;

const LoadingMessage = styled.div`
    color: #777;
    font-size: 1em;
    margin-top: 20px;
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 1em;
    margin-bottom: 20px;
`;

export default StakingPage;
