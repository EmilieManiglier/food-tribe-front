<script lang="ts">
  import { Router, Route } from 'svelte-navigator';
  import { SvelteToast } from '@zerodevx/svelte-toast';

  import {
    DesignSystemPage,
    HomePage,
    Navbar,
    AuthPage,
    FriendGroupsPage
  } from '@/components';
  import { routes, PrivateRoute } from '@/router';
  import { useCurrentUser } from '@/store';

  const { currentUser } = useCurrentUser();
</script>

<Router basepath="/">
  {#if $currentUser}
    <Navbar />
  {/if}

  <main>
    <SvelteToast />

    <!-- TODO : Show DesignSystem Route only in dev mode -->
    <Route path={routes.designSystem.path} component={DesignSystemPage} />

    <Route path={routes.login.path}><AuthPage /></Route>
    <Route path={routes.register.path}><AuthPage /></Route>
    <Route path={routes.friendGroups.path}><FriendGroupsPage /></Route>

    <PrivateRoute path={routes.home.path} let:location>
      <HomePage />
    </PrivateRoute>
  </main>
</Router>
