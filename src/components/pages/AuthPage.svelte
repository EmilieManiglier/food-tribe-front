<script lang="ts">
  import { useLocation, useNavigate } from 'svelte-navigator';
  import { isEmpty } from 'lodash';

  import { AuthLayout, LoginForm, RegisterForm } from '@/components';
  import type { ApiCallParams } from '@/definitions';
  import { routes } from '@/router';
  import { useApi } from '@/store';

  const { call: loginCall, data: loginUser, loading: loginLoading } = useApi();
  const { call: registerCall, data: registerUser, loading: registerLoading } = useApi();
  const navigate = useNavigate();
  const location = useLocation();

  let pageName = $location.pathname.split('/').pop();
  let isRegister = pageName === 'inscription';
  let isLogin = pageName === 'connexion';

  const handleSubmit = async (form: any) => {
    if (isEmpty(form?.detail)) return;

    const call = () => {
      const options: ApiCallParams = {
        url: `/auth/${isLogin ? 'login' : 'register'}`,
        method: 'post',
        params: form.detail
      };
      return isLogin ? loginCall(options) : registerCall(options);
    };

    await call();

    const user = $loginUser || $registerUser;
    if (user) {
      // TODO : store token and user in encrypted cookies
      localStorage.setItem('user', JSON.stringify(user));
      navigate(routes.home.path);
    }
  };
</script>

<AuthLayout>
  <div slot="form">
    {#if isLogin}
      <LoginForm loading={$loginLoading} on:submit={handleSubmit} />
    {:else if isRegister}
      <RegisterForm loading={$registerLoading} on:submit={handleSubmit} />
    {/if}

    <div class="relative">
      <div class="bg-purple-300 h-px w-full" />
      <div class="translate-center-center bg-white whitespace-nowrap p-1">
        {#if isLogin}
          Pas encore de compte&nbsp;?
        {:else if isRegister}
          Déjà inscrit&nbsp;?
        {/if}
      </div>
    </div>

    <div class="pt-12 text-center">
      {#if isLogin}
        <a href={routes.register.path} class="bg-purple-300 p-4 w-full block">
          Créer un compte
        </a>
      {:else if isRegister}
        <a href={routes.login.path} class="bg-purple-300 p-4 w-full block">
          Se connecter
        </a>
      {/if}
    </div>
  </div>

  <h1 slot="intro-title" class="h1">Food Tribe</h1>
  <p slot="intro-description" class="mt-4 auth-description">
    {#if isLogin}
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      <br />
      Aut omnis accusantium fugit neque distinctio earum!
    {:else if isRegister}
      Envie de partager vos meilleurs pépites culinaires avec vos amis&nbsp;?
      <br />
      Inscrivez-vous pour rejoindre la tribu&nbsp;!
    {/if}
  </p>
</AuthLayout>
