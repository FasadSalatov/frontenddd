import { useEffect, useState } from 'react';
import { getUserEnergyIncrease, getUserMultiTap, getUserFullEnergy } from './api';

const useBoostData = () => {
  const [boostData, setBoostData] = useState({
    fullEnergy: { available: 0, remainingMinutes: 0, count: 0 },
    multiTap: { level: 0, remainingMinutes: 0 },
    energyIncrease: { amount: 0, remainingMinutes: 0 }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fullEnergyRes, multiTapRes, energyIncreaseRes] = await Promise.all([
          getUserFullEnergy(),
          getUserMultiTap(),
          getUserEnergyIncrease()
        ]);

        setBoostData({
          fullEnergy: fullEnergyRes.data[0] || { available: 0, remainingMinutes: 0, count: 0 },
          multiTap: multiTapRes.data[0] || { level: 0, remainingMinutes: 0 },
          energyIncrease: energyIncreaseRes.data[0] || { amount: 0, remainingMinutes: 0 }
        });
      } catch (error) {
        console.error("Error fetching boost data", error);
      }
    };

    fetchData();
  }, []);

  return boostData;
};

export default useBoostData;
