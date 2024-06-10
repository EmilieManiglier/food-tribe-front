<script lang="ts">
  import { onMount } from 'svelte';

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

<div
  class="fixed inset-0 z-40 bg-black/25 {open ? 'block' : 'hidden'}"
  on:click={() => (open = false)}
>
  <span class="sr-only">Close modal</span>
</div>

<div class="modal {size} {open && 'open'}">
  <slot name="header" />
  <slot name="body" />
  <slot name="footer" />
</div>
