<script lang="ts">
  import { onMount } from 'svelte';
  import { Map, Marker, MapStyle, config } from '@maptiler/sdk';
  import GeocodingControl from '@maptiler/geocoding-control/svelte/GeocodingControl.svelte';
  import { createMapLibreGlMapController } from '@maptiler/geocoding-control/maplibregl';
  import maplibregl from 'maplibre-gl';
  import '@maptiler/sdk/dist/maptiler-sdk.css';
  import { faPenToSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

  import type {
    FlatPosition,
    MapMarker,
    MapOptionState,
    MarkerModal,
    Place,
    Category
  } from '@/definitions';
  import { Button, Icon, Modal, PlaceForm } from '@/components';
  import { useApi } from '@/store';
  import { displayToast } from '@/helpers';

  type ModalType = 'delete' | 'edit' | 'create' | 'show';

  export let initialState: MapOptionState = {
    lat: 45.76,
    lng: 4.87,
    zoom: 14
  };

  let map: Map;
  let mapContainer: HTMLElement;
  let mapController: any;
  let markers: MapMarker[] = [];
  let showMarkerModal: MarkerModal = { open: false, state: null };
  let newMarkerModal: MarkerModal = { open: false, state: null };
  let deleteModal: MarkerModal = { open: false, state: null };
  let editModal: MarkerModal = { open: false, state: null };

  config.apiKey = import.meta.env.VITE_APP_MAPTILER_API_KEY;

  const { call: placesCall, data: places } = useApi<Place[]>();
  const { call: categoriesCall, data: categories } = useApi<Category[]>();
  const {
    call: deletePlaceCall,
    loading: deleteLoading,
    status: deleteStatus
  } = useApi();

  onMount(() => {
    getPlaces();
    getCategories();
    initMap();

    // Add map listener to open marker modal to show place or create a new one
    map.on('click', (event) => openMarkerModal(event.lngLat, event.point));

    return () => {
      // Destroy map instance when component is destroyed
      map.remove();
    };
  });

  const getPlaces = async () => {
    await placesCall({ url: '/places', method: 'get' });
    if ($places) initMarkers();
  };

  const getCategories = async () => {
    await categoriesCall({ url: '/categories', method: 'get' });
  };

  const initMap = () => {
    map = new Map({
      container: mapContainer,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
      navigationControl: true
    });

    mapController = createMapLibreGlMapController(map, maplibregl);
  };

  const initMarkers = () => {
    $places?.forEach((place: Place) => {
      const marker: MapMarker = new Marker()
        .setLngLat({ lat: place.lat, lng: place.lng })
        .addTo(map);
      marker.place = {
        id: place.id,
        name: place.name,
        categories: place.categories,
        lat: place.lat,
        lng: place.lng
      };
      markers = [...markers, marker];
    });
  };

  const openMarkerModal = (coordinates: MapOptionState, clickPosition: FlatPosition) => {
    // Compare coordinates with every marker in markers to avoid adding duplicates
    const existingMarker = markers.find((marker: MapMarker) =>
      isWithinMargin(marker._flatPos, clickPosition)
    );

    if (existingMarker) {
      showMarkerModal = { open: true, state: existingMarker.place };
    } else {
      newMarkerModal = {
        open: true,
        state: {
          lat: coordinates.lat,
          lng: coordinates.lng,
          categories: $categories,
          name: ''
        }
      };
    }
  };

  const addMarkerFromForm = (event: CustomEvent) => {
    const newMarker: MapMarker = new Marker()
      .setLngLat({ lat: event.detail.lat, lng: event.detail.lng })
      .addTo(map);
    newMarker.place = {
      id: event.detail.id,
      name: event.detail.name,
      categories: event.detail.categories,
      lat: event.detail.lat,
      lng: event.detail.lng
    };
    markers = [...markers, newMarker];
    closeModals();
  };

  const editMarker = (event: CustomEvent) => {
    closeModals();
    const marker = markers.find((marker) => marker.place.id === event.detail.id);
    if (!marker) return;
    marker.place = { ...event.detail, categories: [...event.detail.categories] };
  };

  const isWithinMargin = (
    markerPosition: FlatPosition,
    clickPosition: FlatPosition,
    margin = 50
  ) => {
    // Remove decimals from marker position and convert value to number
    markerPosition = {
      x: Number(markerPosition.x.toFixed(0)),
      y: Number(markerPosition.y.toFixed(0))
    };

    return (
      Math.abs(markerPosition.x - clickPosition.x) <= margin &&
      Math.abs(markerPosition.y - clickPosition.y) <= margin
    );
  };

  const deletePlace = async () => {
    if (!deleteModal.state?.id) return;
    await deletePlaceCall({
      url: `/places/${deleteModal.state.id}`,
      method: 'delete'
    });

    if ($deleteStatus === 204) {
      displayToast('success', 'Le lieu a été supprimé avec succès');
      // Remove marker from map
      const marker = markers.find((marker) => marker.place.id === deleteModal.state.id);
      marker?.remove();
    } else {
      displayToast('error', 'Une erreur est survenue lors de la suppression du lieu');
    }

    closeModals();
  };

  const openModal = (type: ModalType, marker: MapMarker) => {
    closeModals();
    switch (type) {
      case 'delete':
        deleteModal = { open: true, state: marker };
        break;
      case 'edit':
        editModal = { open: true, state: marker };
        break;
      default:
        break;
    }
  };

  const closeModals = () => {
    showMarkerModal = { open: false, state: null };
    newMarkerModal = { open: false, state: null };
    deleteModal = { open: false, state: null };
    editModal = { open: false, state: null };
  };
</script>

<div class="map-wrap">
  <div class="map" bind:this={mapContainer}></div>

  {#if mapController}
    <div class="geocoding">
      <GeocodingControl {mapController} apiKey={config.apiKey} {maplibregl} />
    </div>
  {/if}
</div>

<!-- New Marker Modal -->
<Modal bind:open={newMarkerModal.open}>
  <p slot="header" class="h3 mb-12 md:p-6 md:pb-0">
    Pour ajouter ce lieu dans votre liste, veuillez compléter les informations suivantes
  </p>

  <div slot="body" class="md:p-6 md:pt-0">
    <PlaceForm
      place={newMarkerModal.state}
      on:close={closeModals}
      on:created={addMarkerFromForm}
    />
  </div>
</Modal>

<!-- Show Marker Modal -->
<Modal bind:open={showMarkerModal.open} size="small">
  <p slot="header" class="h2">{showMarkerModal.state?.name}</p>

  <div slot="body" class="flex gap-4 mb-12">
    {#if showMarkerModal.state?.categories?.length > 0}
      {#each showMarkerModal.state.categories as category}
        <span class="badge secondary small">{category.name}</span>
      {/each}
    {/if}
  </div>

  <div slot="footer" class="flex items-center justify-between">
    <Button
      className="small outlined"
      icon={faTrashAlt}
      on:click={() => openModal('delete', showMarkerModal.state)}
    >
      Supprimer
    </Button>

    <Button
      className="small"
      icon={faPenToSquare}
      on:click={() => openModal('edit', showMarkerModal.state)}
    >
      Éditer ce lieu
    </Button>
  </div>
</Modal>

<!-- Edit Marker Modal -->
<Modal bind:open={editModal.open}>
  <p slot="header" class="h3 mb-12 md:p-6 md:pb-0">
    Modifier {editModal.state?.name}
  </p>

  <div slot="body" class="md:p-6 md:pt-0">
    <PlaceForm
      place={editModal.state}
      edit
      on:close={closeModals}
      on:edited={editMarker}
    />
  </div>
</Modal>

<!-- Delete Modal -->
<Modal bind:open={deleteModal.open} size="small">
  <p slot="header" class="h2">{deleteModal.state?.name}</p>

  <div slot="body" class="my-12 text-center">
    <div class="flex-center-center bg-red-100 p-4 rounded-full w-14 h-14 mx-auto mb-4">
      <Icon name={faTrashAlt} size="lg" className="text-red-500" />
    </div>

    <p class="font-bold">Supprimer ce lieu de votre liste ?</p>
  </div>

  <div slot="footer" class="flex items-center justify-between">
    <Button className="small outlined" on:click={closeModals}>Annuler</Button>

    <Button
      className="small"
      icon={faPenToSquare}
      loading={$deleteLoading}
      on:click={deletePlace}
    >
      Confirmer
    </Button>
  </div>
</Modal>

<style lang="scss" scoped>
  .map-wrap {
    position: relative;
    width: 100vw;
    height: 100vh;
  }

  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .geocoding {
    padding: 1rem;
  }

  @media screen and (min-width: 1024px) {
    .map-wrap {
      width: calc(100vw - 16rem);
      margin-left: auto;
    }
  }
</style>
