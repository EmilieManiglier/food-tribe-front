<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { FormInput } from '@/components';

  export let loading = false;
  let form = { email: '', password: '' };

  const dispatch = createEventDispatcher();

  const logUser = (): void => {
    dispatch('submit', form);
  };
</script>

<h2 class="h2 mb-8">Connexion</h2>

<form on:submit|preventDefault={logUser} class="mb-12">
  <FormInput
    bind:value={form.email}
    name="email"
    type="email"
    label="Email"
    className="mb-5"
  />
  <FormInput
    bind:value={form.password}
    name="password"
    type="password"
    label="Mot de passe"
    className="mb-5"
  />

  <button type="submit" class="btn w-full" disabled={loading}>Valider</button>
</form>
