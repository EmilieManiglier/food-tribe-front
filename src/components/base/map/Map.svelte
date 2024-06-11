<script lang="ts">
  import { onMount } from 'svelte';
  import { Map, Marker, MapStyle, config } from '@maptiler/sdk';
  import GeocodingControl from '@maptiler/geocoding-control/svelte/GeocodingControl.svelte';
  import { createMapLibreGlMapController } from '@maptiler/geocoding-control/maplibregl';
  import maplibregl from 'maplibre-gl';
  import '@maptiler/sdk/dist/maptiler-sdk.css';

  import type { FlatPosition, MapOptionState, MarkerModal } from '@/definitions';
  import { Modal } from '@/components';

  export let initialState: MapOptionState = {
    lat: 45.76,
    lng: 4.87,
    zoom: 14
  };
  let map: Map;
  let mapContainer: HTMLElement;
  let mapController: any;
  let markers: Marker[] = [];
  let markerModal: MarkerModal = { open: false, state: null };
  let confirmationModalOpen = false;

  config.apiKey = import.meta.env.VITE_APP_MAPTILER_API_KEY;

  onMount(() => {
    initMap();

    // Add map listener to add marker or open marker modal
    map.on('click', (event) => addMarker(event.lngLat, event.point));

    return () => {
      map.remove();
    };
  });

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

  const addMarker = (coordinates: MapOptionState, clickPosition: FlatPosition) => {
    // Compare coordinates with every marker in markers to avoid adding duplicates
    const existingMarker = markers.find((marker) =>
      isWithinMargin(marker._flatPos, clickPosition)
    );

    if (existingMarker) {
      markerModal = { open: true, state: existingMarker };
    } else {
      const marker = new Marker().setLngLat(coordinates).addTo(map);
      markers = [...markers, marker];
    }
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
</script>

<div class="map-wrap">
  <div class="map" bind:this={mapContainer}></div>

  {#if mapController}
    <div class="geocoding">
      <GeocodingControl {mapController} apiKey={config.apiKey} {maplibregl} />
    </div>
  {/if}
</div>

<Modal bind:open={confirmationModalOpen}>
  <div slot="header">
    <h2>
      Pour ajouter ce lieu dans votre liste, veuillez compléter les informations suivantes
    </h2>
  </div>
</Modal>

<Modal bind:open={markerModal.open}>
  <div slot="header">
    <h2 class="text-2xl">Informations sur le lieu</h2>
  </div>

  <div slot="footer">
    <button
      type="button"
      class="btn outlined"
      on:click={() => (markerModal.open = false)}
    >
      Annuler
    </button>
  </div>
</Modal>

<style>
  .map-wrap {
    position: relative;
    width: 100vw;
    height: calc(100vh - 8rem);
  }

  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .geocoding {
    padding: 1rem;
  }
</style>
