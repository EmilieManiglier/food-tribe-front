<script lang="ts">
  import { onMount, getContext } from 'svelte';
  import { Map, Marker, MapStyle, config } from '@maptiler/sdk';
  import GeocodingControl from '@maptiler/geocoding-control/svelte/GeocodingControl.svelte';
  import { createMapLibreGlMapController } from '@maptiler/geocoding-control/maplibregl';
  import maplibregl from 'maplibre-gl';
  import '@maptiler/sdk/dist/maptiler-sdk.css';
  import { faPenToSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

  import type {
    PlacesContextValue,
    FlatPosition,
    MapMarker,
    MapOptionState,
    Place,
    FriendGroupContextValue,
    Option
  } from '@/definitions';
  import { Button, FormSelect, Icon, Modal, PlaceForm } from '@/components';
  import { _ } from '@/translations';

  export let initialState: MapOptionState = {
    lat: 45.76,
    lng: 4.87,
    zoom: 14
  };

  let map: Map;
  let mapContainer: HTMLElement;
  let mapController: any;
  let markers: MapMarker[] = [];
  let selectFriendGroup: Option = { id: null, name: '' };

  config.apiKey = import.meta.env.VITE_APP_MAPTILER_API_KEY;

  const {
    getPlaces,
    getCategories,
    deletePlace,
    places,
    categories,
    deleteLoading,
    modals,
    closeModals,
    openModal
  } = getContext<PlacesContextValue>('places');

  const { getFriendGroups, friendGroups } =
    getContext<FriendGroupContextValue>('friend-groups');

  onMount(() => {
    initFriendGroups();
    initMap();

    // Add map listener to open marker modal to show place or create a new one
    map.on('click', (event) => openMarkerModal(event.lngLat, event.point));

    return () => {
      // Destroy map instance when component is destroyed
      map.remove();
    };
  });

  const initFriendGroups = async () => {
    await getFriendGroups();

    if ($friendGroups && $friendGroups?.length > 0) {
      selectFriendGroup = $friendGroups[0];
      getPlacesAndCategories();
    }
  };

  const getPlacesAndCategories = async () => {
    if (!$friendGroups?.[0]) return;
    await getPlaces({ friendGroupId: $friendGroups[0].id });
    if ($places?.length > 0) initMarkers();

    // Categories don't need to be fetched first because it is used to display
    // select inside create / edit modals
    getCategories();
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

  const initMarkers = (): void => {
    $places?.forEach((place: Place) => {
      const marker: MapMarker = new Marker()
        .setLngLat({ lat: place.lat, lng: place.lng })
        .addTo(map);
      setMarkerPlace(marker, place);
      markers = [...markers, marker];
    });
  };

  const setMarkerPlace = (marker: MapMarker, place: Place) => {
    marker.place = {
      id: place.id,
      name: place.name,
      categories: place.categories,
      lat: place.lat,
      lng: place.lng,
      description: place.description,
      friendGroupId: place.friendGroupId
    };
  };

  const openMarkerModal = (
    coordinates: MapOptionState,
    clickPosition: FlatPosition
  ): void => {
    // Compare coordinates with every marker in markers to avoid adding duplicates
    const existingMarker = markers.find((marker: MapMarker) =>
      isWithinMargin(marker._flatPos, clickPosition)
    );

    if (existingMarker) {
      openModal('show', existingMarker.place);
    } else {
      openModal('create', {
        lat: coordinates.lat,
        lng: coordinates.lng,
        categories: $categories,
        name: ''
      });
    }
  };

  const addMarkerFromForm = (event: CustomEvent): void => {
    closeModals();
    // Add marker only if the place belongs to the selected friend group
    // The new marker will be visible on selectFriendGroup change
    if (event.detail.friendGroupId !== selectFriendGroup.id) return;
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
  };

  const editMarker = (event: CustomEvent): void => {
    closeModals();
    const marker = markers.find((marker) => marker.place.id === event.detail.id);
    if (!marker) return;
    marker.place = { ...event.detail, categories: [...event.detail.categories] };
  };

  const isWithinMargin = (
    markerPosition: FlatPosition,
    clickPosition: FlatPosition,
    margin = 50
  ): boolean => {
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

  const onFriendGroupChange = async (event: CustomEvent) => {
    // Get places of the selected friend group
    const friendGroupId = event.detail.id;
    await getPlaces({ friendGroupId });
    if ($places?.length > 0) {
      // Delete all markers before adding new ones
      markers.forEach((marker: MapMarker) => marker.remove());
      markers = [];
      initMarkers();
    }
  };
</script>

<div class="map-wrap">
  <div class="map" bind:this={mapContainer}></div>

  <div class="geocoding search-controls">
    {#if mapController}
      <GeocodingControl
        {mapController}
        apiKey={config.apiKey}
        language="fr"
        placeholder={$_('form.searchPlace')}
        class="map-search"
      />
    {/if}

    {#if $friendGroups && $friendGroups.length > 0}
      <FormSelect
        name="friendGroupId"
        options={$friendGroups}
        class="friend-group-select"
        label="name"
        itemId="id"
        clearable={false}
        bind:value={selectFriendGroup}
        on:change={onFriendGroupChange}
      />
    {/if}
  </div>
</div>

<!-- New Marker Modal -->
<Modal bind:open={$modals.create.open}>
  <p slot="header" class="h3 mb-12 md:p-6 md:pb-0">
    {$_('place.create.informations')}
  </p>

  <div slot="body" class="md:p-6 md:pt-0">
    <PlaceForm
      place={$modals.create.state}
      on:close={closeModals}
      on:created={addMarkerFromForm}
    />
  </div>
</Modal>

<!-- Show Marker Modal -->
<Modal bind:open={$modals.show.open} size="small">
  <p slot="header" class="h2">{$modals.show.state?.name}</p>

  <div slot="body" class="flex gap-4 mb-12">
    {#if $modals.show.state?.categories?.length > 0}
      {#each $modals.show.state.categories as category}
        <span class="badge secondary small">{category.name}</span>
      {/each}
    {/if}
  </div>

  <div slot="footer" class="flex items-center justify-between">
    <Button
      className="small outlined"
      icon={faTrashAlt}
      on:click={() => openModal('delete', $modals.show.state)}
    >
      {$_('buttons.delete')}
    </Button>

    <Button
      className="small"
      icon={faPenToSquare}
      on:click={() => openModal('edit', $modals.show.state)}
    >
      {$_('buttons.editPlace')}
    </Button>
  </div>
</Modal>

<!-- Edit Marker Modal -->
<Modal bind:open={$modals.edit.open}>
  <p slot="header" class="h3 mb-12 md:p-6 md:pb-0">
    {$_('place.edit.title', { values: { name: $modals.edit.state?.name } })}
  </p>

  <div slot="body" class="md:p-6 md:pt-0">
    <PlaceForm
      place={$modals.edit.state}
      categories={$categories}
      edit
      on:close={closeModals}
      on:edited={editMarker}
    />
  </div>
</Modal>

<!-- Delete Modal -->
<Modal bind:open={$modals.delete.open} size="small">
  <p slot="header" class="h2">{$modals.delete.state?.name}</p>

  <div slot="body" class="my-12 text-center">
    <div class="flex-center-center bg-red-100 p-4 rounded-full w-14 h-14 mx-auto mb-4">
      <Icon name={faTrashAlt} size="lg" className="text-red-500" />
    </div>

    <p class="font-bold">
      {$_('place.delete.confirm')}
    </p>
  </div>

  <div slot="footer" class="flex items-center justify-between">
    <Button className="small outlined" on:click={closeModals}>
      {$_('buttons.cancel')}
    </Button>

    <Button
      className="small"
      icon={faPenToSquare}
      loading={$deleteLoading}
      on:click={() => deletePlace(markers)}
    >
      {$_('buttons.confirm')}
    </Button>
  </div>
</Modal>

<style lang="scss" scoped>
  .search-controls :global(.friend-group-select) {
    width: 17rem;
    --background: #fff;
    --border-radius: 0.25rem;
  }

  .search-controls :global(.map-search .input-group) {
    height: 100%;
  }

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
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  @media screen and (min-width: 1024px) {
    .map-wrap {
      width: calc(100vw - 16rem);
      margin-left: auto;
    }
  }
</style>
