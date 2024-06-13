<script lang="ts">
  import { Router, Route } from 'svelte-navigator';

  import { DesignSystemPage, HomePage, LoginPage } from '@/components';
  import { routes, PrivateRoute } from '@/router';
</script>

<main>
  <Router basepath="/">
    <!-- TODO : Show DesignSystem Route only in dev mode -->
    <Route path={routes.designSystem.path} component={DesignSystemPage} />

    <Route path={routes.login.path} component={LoginPage} />

    <PrivateRoute path={routes.home.path} let:location>
      <HomePage />
    </PrivateRoute>
  </Router>
</main>
