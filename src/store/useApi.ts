import { AxiosError } from 'axios';
import { writable } from 'svelte/store';

import { api } from '@/api';
import type { ApiCallParams } from '@/definitions';

export const useApi = () => {
  const loading = writable<boolean>(false);
  const data = writable<any>(null);
  const error = writable<AxiosError | null>(null);
  const status = writable<number | null>(null);

  const call = async ({
    url,
    method = 'get',
    params = {},
    axiosOptions = {}
  }: ApiCallParams) => {
    loading.set(true);
    try {
      const body = method === 'get' ? { params } : params;
      const response = await api[method](url, body, axiosOptions);
      data.set(response.data);
      status.set(response.status);
      error.set(null);
    } catch (err) {
      error.set(err as AxiosError);
    } finally {
      loading.set(false);
    }
  };

  return { call, loading, data, error, status };
};
