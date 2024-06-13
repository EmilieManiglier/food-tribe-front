<script lang="ts">
  import { Router, Route } from 'svelte-navigator';

  import { DesignSystemPage, HomePage } from '@/components';
  import { routes, PrivateRoute } from '@/router';
  import AuthPage from '@/components/pages/AuthPage.svelte';
</script>

<main>
  <Router basepath="/">
    <!-- TODO : Show DesignSystem Route only in dev mode -->
    <Route path={routes.designSystem.path} component={DesignSystemPage} />

    <Route path={routes.login.path} component={AuthPage} />
    <Route path={routes.register.path} component={AuthPage} />

    <PrivateRoute path={routes.home.path} let:location>
      <HomePage />
    </PrivateRoute>
  </Router>
</main>
