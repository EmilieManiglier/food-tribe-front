<script lang="ts">
  import Router, { push } from 'svelte-spa-router';
  import { SvelteToast } from '@zerodevx/svelte-toast';

  import { routes, paths } from '@/router';
  import { Navbar } from '@/components';
  import { useCurrentUser } from '@/store';

  const { currentUser } = useCurrentUser();

  // Routes interceptor function that redirects to homepage
  const routesConditionsFailed = () => {
    push(paths.home.path);
  };
</script>

{#if $currentUser}
  <Navbar />
{/if}

<main class="min-h-screen">
  <SvelteToast />
  <Router {routes} on:conditionsFailed={routesConditionsFailed} />
</main>
