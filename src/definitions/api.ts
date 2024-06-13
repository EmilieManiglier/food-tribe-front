export type ApiCallParams = {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete';
  params?: Record<string, unknown>;
  axiosOptions?: Record<string, unknown>;
};
