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

<style lang="scss">
  .btn {
    padding: 1rem;
    background-color: theme('colors.primary.500');
    color: white;
    transition: colors 300ms ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    &:disabled,
    &.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      box-shadow:
        0 0.25rem 0.38rem -0.06rem rgba(0, 0, 0, 0.1),
        0 0.13rem 0.25rem -0.06rem rgba(0, 0, 0, 0.06);
      background-color: theme('colors.primary.600');
    }

    &.small {
      padding: 0.5rem 1rem;
    }

    &.outlined {
      background-color: transparent;
      border: 0.06rem solid theme('colors.primary.500');
      color: theme('colors.primary.500');

      &:not(:disabled):hover {
        background-color: theme('colors.primary.500');
        color: white;
      }
    }

    &.empty {
      background-color: transparent;
      color: theme('colors.gray.700');

      &:not(:disabled):hover {
        background-color: transparent;
        color: theme('colors.primary.600');
        box-shadow: none;
      }
    }
  }
</style>
