import axios from 'axios';

const API_BASE_URL = 'http://localhost:8799/api';

export const getUserEnergyIncrease = () => {
  return axios.get(`${API_BASE_URL}/user-energy-increase`);
};

export const getUserMultiTap = () => {
  return axios.get(`${API_BASE_URL}/user-multi-tap`);
};

export const getUserFullEnergy = () => {
  return axios.get(`${API_BASE_URL}/user-full-energies`);
};

export const getUserData = (user_id) => {
  return axios.get(`${API_BASE_URL}/user-data`, { params: { user_id } });
};

export const updatePersonalBalance = (user_id, amount, daily, limit) => {
  return axios.post(`${API_BASE_URL}/update-personal-balance`, {
    user_id,
    amount,
    daily,
    limit
  });
};

// Добавьте другие API функции по необходимости
