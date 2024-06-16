<script lang="ts">
  import { onMount } from 'svelte';

  let open = false;
  let dropdown: HTMLElement;

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdown && !dropdown.contains(event.target as Node)) {
      open = false;
    }
  };

  onMount(() => {
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div bind:this={dropdown} class="relative">
  <button type="button" class="w-full" on:click={() => (open = !open)}>
    <slot name="trigger" {open} />
  </button>

  <div class="dropdown {open ? 'open' : ''}">
    <slot name="dropdown-content" />
  </div>
</div>

<style lang="scss">
  .dropdown {
    position: absolute;
    top: calc(-100% - 2rem);
    right: 1rem;
    display: block;
    border-radius: 0.25rem;
    box-shadow: 0 0.06rem 0.25rem 0.15rem rgba(0, 0, 0, 0.05);
    background-color: theme('colors.white');
    transition: all 200ms ease;
    min-width: 10rem;
    opacity: 0;
    z-index: -1;

    &.open {
      z-index: 60;
      opacity: 1;
    }
  }
</style>
