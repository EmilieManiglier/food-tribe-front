<script lang="ts">
  import SvelteSelect from 'svelte-select';

  import type { Option } from '@/definitions';

  export let options: Option[];
  export let name: string;
  export let label = '';
  export let value: Option | Option[] | null = null;
  export let placeholder = '';
  export let required = false;
  export let loading = false;
  export let showChevron = true;
  export let searchable = false;
  export let multiple = false;

  const handleChange = (event: CustomEvent) => {
    value = event.detail;
  };
</script>

<div class="form-select">
  {#if label}
    <span class="label">{label}</span>
  {/if}
  <SvelteSelect
    items={options}
    {value}
    {label}
    {required}
    {name}
    {loading}
    {showChevron}
    {searchable}
    {placeholder}
    {multiple}
    on:change={handleChange}
    on:clear={() => (value = null)}
  >
    <div slot="empty">
      <slot name="empty">Aucune option disponible</slot>
    </div>
  </SvelteSelect>
</div>

<style>
  :global(.svelte-select) {
    border: 0 !important;
  }

  .form-select {
    --background: theme('colors.purple.200');
    --height: 3.5rem;
    --border-radius: 0;
    --input-padding: 0;
    --placeholder-color: theme('colors.purple.500');
    --multi-item-bg: theme('colors.purple.500');
    --multi-item-color: #fff;
    --multi-item-clear-icon-color: #fff;
    --list-background: theme('colors.purple.200');
    --list-empty-padding: 1rem;
    --item-hover-bg: theme('colors.purple.500');
    --item-hover-color: #fff;
    --item-is-active-bg: theme('colors.primary.500');
  }
</style>
