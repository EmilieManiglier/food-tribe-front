export type Place = {
  lng: number;
  lat: number;
  id?: number | null;
  name?: string;
  categories?: Category[];
};

export type Category = {
  id: number;
  name: string;
  value?: string;
  label?: string;
};
