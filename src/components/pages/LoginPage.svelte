<script lang="ts">
  import { useNavigate } from 'svelte-navigator';

  import { FormInput } from '@/components';
  import type { User } from '@/definitions';
  import { routes } from '@/router';
  import { useApi } from '@/store';

  const { call, data, loading } = useApi();
  const navigate = useNavigate();

  let form = { email: '', password: '' };

  const logUser = async () => {
    await call({ url: '/auth/login', method: 'post', params: form });

    data.subscribe((user: User) => {
      if (user?.token) {
        // TODO : store token and user in encrypted cookies
        localStorage.setItem('user', JSON.stringify(user));
        navigate(routes.home.path);
      }
    });
  };
</script>

<div>
  <h1>Connexion</h1>

  <form class="w-[90%] mx-auto md:w-[25rem]" on:submit|preventDefault={logUser}>
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

    <button type="submit" class="btn" disabled={$loading}>Valider</button>
  </form>
</div>
