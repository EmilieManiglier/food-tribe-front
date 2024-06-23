<script lang="ts">
  import { push, location, link } from 'svelte-spa-router';
  import { isEmpty } from 'lodash';

  import { AuthLayout, LoginForm, RegisterForm } from '@/components';
  import type { ApiCallParams, User } from '@/definitions';
  import { paths } from '@/router';
  import { useApi, useCurrentUser } from '@/store';
  import { _ } from '@/translations';

  import logo from '@/assets/img/logo-inline-white.png';

  const { call: loginCall, data: loginUser, loading: loginLoading } = useApi<User>();
  const {
    call: registerCall,
    data: registerUser,
    loading: registerLoading
  } = useApi<User>();
  const { currentUser } = useCurrentUser();

  let isRegister = $location === paths.register.path;
  let isLogin = $location === paths.login.path;

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
      currentUser.set(user);
      push(paths.home.path);
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
          {$_('login.alreadyRegistered')}
        {:else if isRegister}
          {$_('register.notRegistered')}
        {/if}
      </div>
    </div>

    <div class="pt-12 text-center">
      {#if isLogin}
        <a use:link href={paths.register.path} class="bg-purple-300 p-4 w-full block">
          {$_('register.createAccount')}
        </a>
      {:else if isRegister}
        <a use:link href={paths.login.path} class="bg-purple-300 p-4 w-full block">
          {$_('login.loginCta')}
        </a>
      {/if}
    </div>
  </div>

  <h1 slot="intro-title" class="h-12 w-72 -ml-1">
    <img src={logo} alt="Logo Food Tribe" class="h-full w-full object-contain" />
    <span class="sr-only">Food tribe</span>
  </h1>
  <p slot="intro-description" class="mt-4 auth-description">
    {#if isLogin}
      {$_('login.description')}
    {:else if isRegister}
      {@html $_('register.description')}
    {/if}
  </p>
</AuthLayout>
