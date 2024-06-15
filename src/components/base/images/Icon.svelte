<script lang="ts">
  import Fa, { type IconSize } from 'svelte-fa';

  import * as customIcons from '@/assets/svg';

  export let name;
  export let className = '';
  export let size: IconSize = 'sm';
  export let customIcon = false;
</script>

{#if customIcon}
  <svg
    class={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    focusable="false"
  >
    <use href={`${customIcons[name]}#icon-${name}`} />
  </svg>
{:else}
  <Fa icon={name} class={className} {size} />
{/if}
