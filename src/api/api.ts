import axios, { AxiosError, type AxiosResponse } from 'axios';
import { displayToast } from '@/helpers';
import { useCurrentUser } from '@/store';

type ApiError = AxiosError & {
  response: {
    status: number;
    data: {
      error: string;
    };
  };
};

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1`
});

api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem('user');
  const user = JSON.parse(storedUser || '{}');

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: ApiError) => {
    if (
      error?.response?.status === 401 &&
      error?.response?.data?.error === 'Token expired'
    ) {
      const { currentUser } = useCurrentUser();
      currentUser.set(null);
      displayToast('warning', 'Votre session a expirée, veuillez vous reconnecter');
      window.location.href = '#/connexion';
    }
  }
);
