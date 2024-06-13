<script lang="ts">
  import { useCurrentUser } from '@/store';

  const { currentUser } = useCurrentUser();
</script>

{#if $currentUser}
  <h1>Welcome back, {$currentUser?.firstname}</h1>
{:else}
  <h1>Welcome to the home page</h1>
{/if}
