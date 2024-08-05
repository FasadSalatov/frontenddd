import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ComboNotification, Notification, WrapperPage } from "../components";
import ennergy from '../components/MinePageComponents/tunder.png';
import tapy from '../components/MinePageComponents/tap.png';
import eneg from '../components/MinePageComponents/eneg.png';
import { getUserEnergyIncrease, getUserMultiTap, getUserFullEnergy, getUserData } from '../api';

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

  const handleFullEnergyClick = () => {
    console.log("Full energy button clicked");
  };

  const handleMultiTapClick = () => {
    console.log("Multi-tap button clicked");
  };

  const handleEnergyIncreaseClick = () => {
    console.log("Energy increase button clicked");
  };

  return (
    <WrapperPage>
      <Notification coin={userData.balance_personal} boostData={boostData} />
      <ComboNotification />

      <BoostContainer>
        <BoostButton onClick={handleFullEnergyClick}>
          <BoostHeader>
            <BoostIcon src={ennergy} alt="Full energy" />
            <Diy>
              <BoostTitle>Full energy</BoostTitle>
              <BoostDescription>{boostData.fullEnergy.count}/6 available</BoostDescription>
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
