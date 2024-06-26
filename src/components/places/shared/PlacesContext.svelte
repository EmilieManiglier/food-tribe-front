<script lang="ts">
  import { setContext } from 'svelte';
  import { writable, get } from 'svelte/store';

  import type {
    Category,
    MapMarker,
    Place,
    PlaceModalType,
    PlaceModals,
    PlacesContextValue,
    GetPlaceCallOptions
  } from '@/definitions';
  import { useApi } from '@/store';
  import { displayToast } from '@/helpers';
  import { _ } from '@/translations';

  let modals = writable<PlaceModals>({
    delete: { open: false, state: null },
    edit: { open: false, state: null },
    create: { open: false, state: null },
    show: { open: false, state: null }
  });

  const { call: placesCall, data: places, loading: placesLoading } = useApi<Place[]>();
  const { call: categoriesCall, data: categories } = useApi<Category[]>();
  const {
    call: deletePlaceCall,
    loading: deleteLoading,
    status: deleteStatus
  } = useApi();

  const getPlaces = async (options: GetPlaceCallOptions = {}) => {
    const { friendGroupId } = options;
    let url = '/places';
    if (friendGroupId) url += `?friendGroupId=${friendGroupId}`;
    await placesCall({ url, method: 'get' });
  };

  const getCategories = async () => {
    await categoriesCall({ url: '/categories', method: 'get' });
  };

  const deletePlace = async (markers: MapMarker[]) => {
    const deleteModal = get(modals).delete;

    if (!deleteModal.state?.id) return;
    await deletePlaceCall({
      url: `/places/${deleteModal.state?.id}`,
      method: 'delete'
    });

    if ($deleteStatus === 204) {
      displayToast('success', $_('place.delete.success'));
      // Remove marker from map
      const marker = markers.find(
        (marker: MapMarker) => marker.place.id === deleteModal.state.id
      );
      marker?.remove();
    } else {
      displayToast('error', $_('place.delete.error'));
    }
    closeModals();
  };

  const closeModals = () => {
    const modalsValue = get(modals);
    const newModalsValue: PlaceModals = { ...modalsValue };
    for (const key in newModalsValue) {
      newModalsValue[key as PlaceModalType] = { open: false, state: null };
    }
    modals.set(newModalsValue);
  };

  const openModal = (type: PlaceModalType, marker: MapMarker) => {
    closeModals();
    modals.set({
      ...get(modals),
      [type]: { open: true, state: marker }
    });
  };

  setContext<PlacesContextValue>('places', {
    places,
    placesLoading,
    categories,
    getPlaces,
    getCategories,
    deletePlace,
    deleteLoading,
    deleteStatus,
    // Places modals
    modals,
    openModal,
    closeModals
  });
</script>

<slot />
