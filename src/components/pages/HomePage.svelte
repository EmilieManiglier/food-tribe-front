<script lang="ts">
  import { useApi, useCurrentUser } from '@/store';
  import { onMount } from 'svelte';

  const { currentUser } = useCurrentUser();
  const { call } = useApi();

  onMount(() => {
    getPlaces();
  });

  const getPlaces = async () => {
    await call({ url: '/places', method: 'get' });
  };
</script>

{#if $currentUser}
  <h1>Welcome back, {$currentUser?.firstname}</h1>
{:else}
  <h1>Welcome to the home page</h1>
{/if}
