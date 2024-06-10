export type MapOptionState = {
	lat: number;
	lng: number;
	zoom?: number;
};

export type MarkerModal = {
	open: boolean;
	state: Marker | null;
};

export type FlatPosition = {
	x: number;
	y: number;
};
