export type Place = {
  lng: number;
  lat: number;
  id?: number | null;
  streetAddress?: string;
  name?: string;
  description?: string;
  categories?: Category[];
  friendGroupId?: number | null;
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

export type GetPlaceCallOptions = {
  friendGroupId?: number;
};

export type PlacesContextValue = {
  places: Writable<Place[]>;
  placesLoading: Writable<boolean>;
  categories: Writable<Category[]>;
  getPlaces: (options: GetPlaceCallOptions = {}) => Promise<void>;
  getCategories: () => Promise<void>;
  deletePlace: (markers: MapMarker[]) => Promise<void>;
  deleteLoading: Writable<boolean>;
  deleteStatus: Writable<number>;
  modals: Writable<PlaceModals>;
  openModal: (type: PlaceModalType, marker: MapMarker) => void;
  closeModals: () => void;
};
