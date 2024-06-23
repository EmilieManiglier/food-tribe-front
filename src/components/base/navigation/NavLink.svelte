<script lang="ts">
  import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
  import { link, location } from 'svelte-spa-router';

  import { Icon } from '@/components';

  export let icon: IconDefinition | null = null;
  export let to: string;
  export let menuOpen: boolean;
</script>

<a
  href={to}
  class="nav-link {$location === to && 'active'}"
  use:link={{ href: to, disabled: $location === to }}
  on:click={() => (menuOpen = false)}
>
  <Icon
    name={icon}
    className={$location === to ? 'text-primary-500' : 'text-purple-500'}
    size="lg"
  />
  <slot />
</a>

<style lang="scss">
  .nav-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 2rem 1rem 2rem 2.75rem;
    border-bottom: 0.06rem solid theme('colors.purple.300');
    color: theme('colors.purple.500');

    &:hover:not(.active) {
      color: theme('colors.primary.500');
    }

    &.active {
      color: theme('colors.gray.700');
      border-right: 0.19rem solid theme('colors.primary.500');
    }
  }

  @media screen and (min-width: 1024px) {
    .nav-link {
      border: 0;
      padding: 1.5rem;

      &.active {
        margin-right: -0.13rem;
      }
    }
  }
</style>
