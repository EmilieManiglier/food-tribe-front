<script lang="ts">
  import {
    faLocationArrow,
    faLocationDot,
    faUtensils
  } from '@fortawesome/free-solid-svg-icons';
  import { push } from 'svelte-spa-router';

  import { Button, Icon } from '@/components';
  import type { Place } from '@/definitions';
  import { paths } from '@/router';
  import { _ } from '@/translations';

  export let place: Place;
  export let className = '';

  const redirectToMap = () => {
    // Redirect to map and show marker for the place
    const path = `${paths.home.path}?lat=${place.lat}&lng=${place.lng}&friendGroupId=${place.friendGroupId}`;
    push(path);
  };
</script>

<div class="bg-white py-4 px-8 shadow-sm max-w-2xl {className}">
  <p class="font-title font-bold text-xl mb-1">{place.name}</p>

  <div class="flex-center-between gap-4">
    <div class="flex items-center gap-4">
      {#if place.streetAddress}
        <div class="flex items-center gap-2">
          <Icon name={faLocationDot} className="text-primary-500" />
          <span>{place.streetAddress}</span>
        </div>
      {/if}

      {#if place.categories && place.categories.length > 0}
        <div class="flex items-center gap-2">
          <Icon name={faUtensils} className="text-primary-500" />
          {place.categories[0].name}
        </div>
      {/if}
    </div>

    <Button on:click={redirectToMap}>
      <span>{$_('place.seeOnMap')}</span>
      <Icon name={faLocationArrow} className="text-white" />
    </Button>
  </div>
</div>
