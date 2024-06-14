<script lang="ts">
  export let name: string;
  export let label: string;
  export let type: 'email' | 'number' | 'password' | 'phone' | 'text' = 'text';
  export let value: string;
  export let className: string = '';
  export let required: boolean = false;

  // Set the input type on compile time
  const setType = (node: HTMLInputElement, type: string) => {
    node.type = type;
  };
</script>

<label class={className}>
  <span class="label">{label}</span>

  <input bind:value {name} use:setType={type} class="input" {required} />
</label>
