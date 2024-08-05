import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api2';

// Получение данных пользователя
export const getUserData = (user_id) => {
  return axios.get(`${API_BASE_URL}/user/${user_id}`);
};

// Клик по кнопке пользователя
export const clickUserButton = (user_id) => {
  return axios.get(`${API_BASE_URL}/user/click/${user_id}`);
};

// Заполнение энергии
export const fullEnergy = (user_id) => {
  return axios.get(`${API_BASE_URL}/user/full-energy/${user_id}`);
};

// Увеличение энергии
export const boostEnergy = (user_id) => {
  return axios.get(`${API_BASE_URL}/user/boost-energy/${user_id}`);
};

// Увеличение кликов
export const boostClick = (user_id) => {
  return axios.get(`${API_BASE_URL}/user/boost-click/${user_id}`);
};

// Ежедневное вознаграждение
export const claimDailyReward = (user_id) => {
  return axios.get(`${API_BASE_URL}/user/day-claim/${user_id}`);
};

// Проверка выполнения задачи
export const checkTask = (user_id, task_id) => {
  return axios.get(`${API_BASE_URL}/user/check-task/${user_id}/${task_id}`);
};

// Установка ставки
export const setStake = (user_id, stake_type, stake_value) => {
  return axios.get(`${API_BASE_URL}/user/set-stake/${user_id}/${stake_type}/${stake_value}`);
};

// Обновление персонального баланса
export const updatePersonalBalance = (user_id, amount, daily, limit) => {
  // Предположим, что API принимает POST-запрос для обновления баланса
  return axios.post(`${API_BASE_URL}/user/update-balance`, { user_id, amount, daily, limit });
};

// Получение данных о увеличении энергии
export const getUserEnergyIncrease = () => {
  return axios.get(`${API_BASE_URL}/energy-increase`);
};

export const updateUserWallet = (user_id, wallet) => {
  return axios.post(`${API_BASE_URL}/update-user-wallet`, { user_id, wallet });
};

// Получение данных о мультитапе
export const getUserMultiTap = () => {
  return axios.get(`${API_BASE_URL}/multi-tap`);
};

// Получение данных о полном уровне энергии
export const getUserFullEnergy = () => {
  return axios.get(`${API_BASE_URL}/full-energy`);
};
