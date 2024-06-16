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
    @apply fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 -z-10 w-9/10 max-w-9/10 h-9/10 max-h-9/10 opacity-0 transition-opacity duration-200 ease-in-out;

    &.small {
      @apply max-w-sm h-fit;
    }

    &.medium {
      @apply max-w-4xl h-fit;
    }

    &.open {
      @apply opacity-100 z-50;
    }
  }
</style>
