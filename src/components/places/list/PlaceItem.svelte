<script lang="ts">
  import { faLocationDot, faUtensils } from '@fortawesome/free-solid-svg-icons';

  import { Icon } from '@/components';
  import type { Place } from '@/definitions';

  export let place: Place;
  export let className = '';
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
  </div>
</div>
