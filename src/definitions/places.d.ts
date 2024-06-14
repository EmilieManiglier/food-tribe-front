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

export type PlaceModals = {
  delete: MarkerModal;
  edit: MarkerModal;
  create: MarkerModal;
  show: MarkerModal;
};

export type PlaceModalType = 'delete' | 'edit' | 'create' | 'show';

export type PlacesContextValue = {
  places: Writable<Place[]>;
  categories: Writable<Category[]>;
  getPlaces: () => Promise<void>;
  getCategories: () => Promise<void>;
  deletePlace: (markers: MapMarker[]) => Promise<void>;
  deleteLoading: Writable<boolean>;
  deleteStatus: Writable<number>;
  modals: Writable<PlaceModals>;
  openModal: (type: PlaceModalType, marker: MapMarker) => void;
  closeModals: () => void;
};
