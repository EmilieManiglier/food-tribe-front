<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { FormInput } from '@/components';

  export let loading = false;

  let form = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    city: '',
    zipCode: '',
    country: ''
  };

  const dispatch = createEventDispatcher();

  const registerUser = (): void => {
    dispatch('submit', form);
  };
</script>

<h2 class="h2 mb-8">Inscription</h2>

<form
  on:submit|preventDefault={registerUser}
  class="mb-12 lg:grid lg:grid-cols-12 lg:gap-y-4"
>
  <div class="lg:col-span-6">
    <div class="grid grid-cols-2 gap-4 lg:pr-6">
      <FormInput
        bind:value={form.firstname}
        name="firstname"
        label="Prénom"
        className="col-span-2 lg:col-span-1"
      />
      <FormInput
        bind:value={form.lastname}
        name="lastname"
        label="Nom"
        className="col-span-2 lg:col-span-1"
      />

      <FormInput
        bind:value={form.email}
        name="email"
        type="email"
        label="Email"
        className="col-span-2"
      />

      <FormInput
        bind:value={form.password}
        name="password"
        type="password"
        label="Mot de passe"
        className="col-span-2"
      />
    </div>
  </div>

  <div class="mt-4 lg:mt-0 lg:col-span-6 complementary-block">
    <div class="grid grid-cols-2 gap-4">
      <FormInput
        bind:value={form.zipCode}
        name="zipCode"
        label="Code postal"
        className="col-span-2 lg:col-span-1"
      />
      <FormInput
        bind:value={form.city}
        name="city"
        label="Ville"
        className="col-span-2 lg:col-span-1"
      />

      <FormInput
        bind:value={form.country}
        name="country"
        label="Pays"
        className="col-span-2"
      />
    </div>
  </div>

  <button type="submit" class="btn mt-4 w-full lg:mt-0 lg:col-span-12" disabled={loading}
    >Valider</button
  >
</form>

<style lang="scss">
  @media screen and (min-width: 768px) {
    .complementary-block {
      padding-left: 1.5rem;
      border-left: 0.06rem solid theme('colors.purple.300');
    }
  }
</style>
