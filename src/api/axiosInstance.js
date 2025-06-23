import axios from 'axios';

const api = axios.create({
  baseURL: 'https://app-pets-backend.onrender.com/api',
  timeout: 10000,
});

export default api;
