<script lang="ts">
  import { faCircleNotch, type IconDefinition } from '@fortawesome/free-solid-svg-icons';

  import { Icon } from '@/components';
  import type { IconSize } from 'svelte-fa';

  export let className = '';
  export let type: 'button' | 'submit' = 'button';
  export let loading = false;
  export let disabled = false;
  export let icon: IconDefinition | null = null;
  export let iconClassName = '';
  export let iconSize: IconSize = 'sm';
</script>

<button
  {type}
  disabled={disabled || loading}
  class="btn {className}"
  on:click
  {...$$restProps}
>
  {#if loading}
    <Icon name={faCircleNotch} className="animate-spin" />
  {:else}
    {#if icon}
      <Icon name={icon} className={iconClassName} size={iconSize} />
    {/if}
    <slot />
  {/if}
</button>
