<script>
  import { useNavigate, useLocation } from 'svelte-navigator';

  import { useCurrentUser } from '@/store';
  import { routes } from '@/router';

  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useCurrentUser();

  $: if (!$currentUser) {
    navigate(routes.login.path, {
      state: { from: $location.pathname },
      replace: true
    });
  }
</script>

{#if $currentUser}
  <slot />
{/if}
