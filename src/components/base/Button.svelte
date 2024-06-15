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

<style lang="postcss">
  .btn {
    @apply p-4 bg-primary-500 text-white rounded-sm transition-colors duration-300 ease-in-out flex items-center gap-4;

    &:disabled,
    &.disabled {
      @apply opacity-60 cursor-not-allowed;
    }

    &:not(:disabled):hover {
      @apply shadow-md bg-primary-600;
    }

    &.small {
      @apply px-4 py-2;
    }

    &.outlined {
      @apply bg-transparent border border-primary-500 text-primary-500;

      &:not(:disabled):hover {
        @apply bg-primary-500 text-white;
      }
    }

    &.empty {
      @apply bg-transparent text-gray-700;

      &:not(:disabled):hover {
        @apply bg-transparent text-primary-600 shadow-none;
      }
    }
  }
</style>
