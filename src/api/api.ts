import axios from 'axios';

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1`
});

api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem('user');
  const token = storedUser ? JSON.parse(storedUser).token : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
