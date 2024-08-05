import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ComboNotification, Notification, WrapperPage } from "../components";
import ennergy from '../components/MinePageComponents/tunder.png';
import tapy from '../components/MinePageComponents/tap.png';
import eneg from '../components/MinePageComponents/eneg.png';

const BoostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2A2A2E;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  margin: -10px auto;
  background: transparent;
`;

const BoostButton = styled.div`
  background-color: rgba(11, 27, 40, 0.6);
  color: white;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  height: 80px;
  width: 110%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;
  transition: 200ms;

  &:active {
    transition: 200ms;
    background-color: rgba(11, 27, 40, 0.8);
  }
`;

const Diy = styled.div`
  display: flex;
  flex-direction: column;
`;

const BoostHeader = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: row;
  margin-bottom: 10px;
  width: 100%;
`;

const BoostIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`;

const BoostTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
`;

const BoostDescription = styled.span`
  font-size: 12px;
  color: #aaa;
  margin-top: -5px;
`;

const TimerText = styled.span`
  font-size: 12px;
  color: #aaa;
  align-self: flex-end;
  margin-top: -10px;
  margin-right: 3%;
`;

const MinePage = () => {
  const [boostData, setBoostData] = useState({
    fullEnergy: { available: 0, remainingMinutes: 0, count: 0 },
    multiTap: { level: 0, remainingMinutes: 0 },
    energyIncrease: { amount: 0, remainingMinutes: 0 }
  });

  const [userData, setUserData] = useState({
    user_id: 2, // Установите ID пользователя
    balance: 0,
    max_energy: 0,
    coins_per_day: 0,
    boost_click: null,
    boost_energy: null,
    full_energy: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api2/user/${userData.user_id}`);
        const data = await response.json();

        setUserData(data);

        setBoostData({
          fullEnergy: {
            available: data.full_energy ? 1 : 0,
            remainingMinutes: data.full_energy ? 1440 - Math.floor((new Date() - new Date(data.full_energy)) / 60000) : 0,
            count: data.max_energy || 0
          },
          multiTap: {
            level: data.boost_click ? 1 : 0,
            remainingMinutes: data.boost_click ? 1440 - Math.floor((new Date() - new Date(data.boost_click)) / 60000) : 0
          },
          energyIncrease: {
            amount: data.coins_per_day || 0,
            remainingMinutes: data.boost_energy ? 1440 - Math.floor((new Date() - new Date(data.boost_energy)) / 60000) : 0
          }
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [userData.user_id]);

  const handleFullEnergyClick = async () => {
    try {
      const response = await fetch(`/api2/user/full-energy/${userData.user_id}`);
      console.log("Full energy response:", response);
    } catch (error) {
      console.error("Error on full energy click:", error);
    }
  };

  const handleMultiTapClick = async () => {
    try {
      const response = await fetch(`/api2/user/boost-click/${userData.user_id}`);
      console.log("Multi-tap response:", response);
    } catch (error) {
      console.error("Error on multi-tap click:", error);
    }
  };

  const handleEnergyIncreaseClick = async () => {
    try {
      const response = await fetch(`/api2/user/boost-energy/${userData.user_id}`);
      console.log("Energy increase response:", response);
    } catch (error) {
      console.error("Error on energy increase click:", error);
    }
  };

  return (
    <WrapperPage>
      <Notification coin={userData.balance} boostData={boostData} />
      <ComboNotification />

      <BoostContainer>
        <BoostButton onClick={handleFullEnergyClick}>
          <BoostHeader>
            <BoostIcon src={ennergy} alt="Full energy" />
            <Diy>
              <BoostTitle>Full energy</BoostTitle>
              <BoostDescription>{boostData.fullEnergy.count}/2000 available</BoostDescription>
            </Diy>
          </BoostHeader>
          <TimerText>{boostData.fullEnergy.remainingMinutes} minutes remaining</TimerText>
        </BoostButton>
        <BoostButton onClick={handleMultiTapClick}>
          <BoostHeader>
            <BoostIcon src={tapy} alt="Multi-tap" />
            <Diy>
              <BoostTitle>Multi-tap</BoostTitle>
              <BoostDescription>{boostData.multiTap.level} level</BoostDescription>
            </Diy>
          </BoostHeader>
          <TimerText>{boostData.multiTap.remainingMinutes} minutes remaining</TimerText>
        </BoostButton>
        <BoostButton onClick={handleEnergyIncreaseClick}>
          <BoostHeader>
            <BoostIcon src={eneg} alt="Energy Increase" />
            <Diy>
              <BoostDescription>+{boostData.energyIncrease.amount}</BoostDescription>
              <BoostTitle>Energy Increase</BoostTitle>
            </Diy>
          </BoostHeader>
          <TimerText>Will be available in {boostData.energyIncrease.remainingMinutes} minutes</TimerText>
        </BoostButton>
      </BoostContainer>
    </WrapperPage>
  );
};

export default MinePage;
