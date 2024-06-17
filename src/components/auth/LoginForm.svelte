<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Button, FormInput } from '@/components';
  import { _ } from '@/translations';

  export let loading = false;
  let form = { email: '', password: '' };

  const dispatch = createEventDispatcher();

  const logUser = (): void => {
    dispatch('submit', form);
  };
</script>

<h2 class="h2 mb-8">{$_('login.title')}</h2>

<form on:submit|preventDefault={logUser} class="mb-12">
  <FormInput
    bind:value={form.email}
    name="email"
    type="email"
    label={$_('form.email')}
    className="mb-5"
  />
  <FormInput
    bind:value={form.password}
    name="password"
    type="password"
    label={$_('form.password')}
    className="mb-5"
  />

  <Button type="submit" className="w-full" disabled={loading}>
    {$_('buttons.validate')}
  </Button>
</form>
