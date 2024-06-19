<script lang="ts">
  import { onMount } from 'svelte';
  import { faClose } from '@fortawesome/free-solid-svg-icons';

  import { Icon, Button } from '@/components';
  import { _ } from '@/translations';

  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let open: boolean;

  $: {
    // Prevent scrolling when the modal is open
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  onMount(() => {
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  });

  // Close the modal when the escape key is pressed
  const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') open = false;
  };
</script>

{#if open}
  <div
    class="fixed inset-0 z-40 bg-purple-900/90 {open ? 'block' : 'hidden'}"
    on:click={() => (open = false)}
  >
    <span class="sr-only">{$_('buttons.closeModal')}</span>
  </div>

  <div class="modal {size} {open && 'open'}">
    <div class="flex-start-between gap-4">
      <slot name="header" />

      <Button className="small empty" on:click={() => (open = false)}>
        <Icon name={faClose} size="lg" />
        <span class="sr-only">{$_('buttons.closeModal')}</span>
      </Button>
    </div>
    <slot name="body" />
    <slot name="footer" />
  </div>
{/if}

<style lang="postcss" scoped>
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 0.375rem;
    padding: 1rem;
    z-index: -10;
    width: 90%;
    max-width: 90%;
    height: 90%;
    max-height: 90%;
    opacity: 0;
    transition: opacity 200ms ease-in-out;

    &.small {
      max-width: 24rem;
      height: fit-content;
    }

    &.medium {
      max-width: 64rem;
      height: fit-content;
      max-height: 75%;
      overflow-y: auto;
    }

    &.open {
      opacity: 1;
      z-index: 50;
    }
  }
</style>
