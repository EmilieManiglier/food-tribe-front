<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import SvelteSelect from 'svelte-select';

  import type { Option } from '@/definitions';

  export let options: Option[];
  export let name: string;
  export let selectLabel = '';
  export let value: Option | Option[] | null = null;
  export let placeholder = '';
  export let required = false;
  export let loading = false;
  export let showChevron = true;
  export let searchable = false;
  export let clearable = true;
  export let multiple = false;
  export let itemId: 'value' | 'id' = 'value';
  export let label: 'label' | 'name' = 'label';

  const dispatch = createEventDispatcher();

  const handleChange = (event: CustomEvent) => {
    value = event.detail;
    dispatch('change', event.detail);
  };
</script>

<div class="form-select {$$props.class}">
  {#if selectLabel}
    <span class="label">{selectLabel}</span>
  {/if}
  <SvelteSelect
    items={options}
    {value}
    {required}
    {name}
    {loading}
    {showChevron}
    {searchable}
    {clearable}
    {placeholder}
    {multiple}
    {label}
    {itemId}
    on:change={handleChange}
    on:clear={() => (value = null)}
  >
    <div slot="empty" class="p-4">
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
    --border-radius: 0;
    --input-padding: 0;
    --placeholder-color: theme('colors.purple.500');
    --multi-item-bg: theme('colors.purple.500');
    --multi-item-color: #fff;
    --multi-item-clear-icon-color: #fff;
    --list-background: theme('colors.purple.200');
    --list-empty-padding: 1.5rem;
    --item-hover-bg: theme('colors.purple.500');
    --item-hover-color: #fff;
    --item-is-active-bg: theme('colors.primary.500');
  }
</style>
