export type User = {
  token: string;
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  city?: string;
  zipCode?: string;
  country?: string;
};
