<script lang="ts">
  import { Icon } from '@/components';
  import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

  import { useLocation } from 'svelte-navigator';

  export let icon: IconDefinition | null = null;
  export let to: string;

  let activeRoute: string = '';

  const location = useLocation();

  $: activeRoute = $location.pathname;
</script>

<svelte:element
  this={activeRoute === to ? 'span' : 'a'}
  href={to}
  class="nav-link {activeRoute === to && 'active'}"
>
  <Icon
    name={icon}
    className={activeRoute === to ? 'text-primary-500' : 'text-purple-500'}
    size="lg"
  />
  <slot />
</svelte:element>

<style lang="scss">
  .nav-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
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
      padding-left: 1.5rem;

      &.active {
        margin-right: -0.13rem;
      }
    }
  }
</style>
