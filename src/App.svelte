<script lang="ts">
  import { Router, Route } from 'svelte-navigator';

  import { routes } from '@/router';
  import { DesignSystemPage, HomePage, LoginPage } from '@/components';
</script>

<main>
  <Router basepath="/">
    <!-- TODO : Show DesignSystem Route only in dev mode -->
    <Route path={routes.designSystem.path} component={DesignSystemPage} />

    <Route path={routes.home.path} component={HomePage} />
    <Route path={routes.login.path} component={LoginPage} />
  </Router>
</main>
