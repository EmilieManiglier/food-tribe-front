<script lang="ts">
  import { _ } from '@/translations';

  export let value: string;
  export let label = '';
  export let required = false;
  export let showOptional = false;
</script>

<label class="textarea">
  {#if label}
    <div class="flex items-center gap-1">
      <span class="label">{label}</span>
      {#if showOptional}
        <span class="text-sm">({$_('form.optional')})</span>
      {/if}
    </div>
  {/if}

  <textarea class="input h-24 w-full" {...$$restProps} {required} bind:value></textarea>
</label>
