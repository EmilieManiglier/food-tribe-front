<script lang="ts">
  import { Router, Route } from 'svelte-routing';

  import { routes } from '@/router';
  import { DesignSystemPage } from '@/components';
</script>

<main>
  <Router basepath="/">
    <Route path={routes.designSystem.path} component={DesignSystemPage} />
  </Router>
</main>
