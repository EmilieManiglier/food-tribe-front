<script lang="ts">
  import Router, { push } from 'svelte-spa-router';
  import { SvelteToast } from '@zerodevx/svelte-toast';

  import { routes, paths } from '@/router';
  import { Navbar } from '@/components';
  import { useCurrentUser } from '@/store';

  const { currentUser } = useCurrentUser();

  // Routes interceptor function that redirects to homepage or login
  const routesConditionsFailed = () => {
    $currentUser ? push(paths.home.path) : push(paths.login.path);
  };
</script>

{#if $currentUser}
  <Navbar />
{/if}

<main class="min-h-screen">
  <SvelteToast />
  <Router {routes} on:conditionsFailed={routesConditionsFailed} />
</main>
