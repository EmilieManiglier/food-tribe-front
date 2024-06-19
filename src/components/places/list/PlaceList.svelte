<script lang="ts">
  import { getContext, onMount } from 'svelte';

  import { PlaceItem } from '@/components';
  import type { PlacesContextValue } from '@/definitions';
  import { _ } from '@/translations';

  const { getPlaces, places, placesLoading } = getContext<PlacesContextValue>('places');

  let skeletonsArray = Array.from({ length: 5 }, (_, i) => i + 1);

  onMount(() => getPlaces());
</script>

<div class="main-container bg-purple-200 min-h-screen">
  <h2 class="h2 mb-12">{$_('place.title')}</h2>

  {#if $placesLoading}
    {#each skeletonsArray as _}
      <div class="mb-12 bg-white p-4 max-w-3xl">
        <div class="skeleton w-3/4 h-4 lg:w-1/2 mb-6" />

        <div class="flex items-center gap-4">
          <div class="skeleton w-16 h-4 rounded-md" />
          <div class="skeleton w-16 h-4 rounded-md" />
          <div class="skeleton w-16 h-4 rounded-md" />
        </div>
      </div>
    {/each}
  {/if}

  {#if !$placesLoading}
    {#if $places?.length > 0}
      {#each $places as place}
        <PlaceItem {place} className="mb-6" />
      {/each}
    {:else}
      <p>{$_('place.noPlace')}</p>
    {/if}
  {/if}
</div>
