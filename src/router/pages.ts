import { wrap } from 'svelte-spa-router/wrap';

import { useCurrentUser } from '@/store';
import { paths } from '@/router/paths';

const env = import.meta.env.VITE_APP_BUN_ENV;
const { isLoggedIn } = useCurrentUser();

export const pages = {
  [paths.login.path]: wrap({
    asyncComponent: () => import('@/components/pages/AuthPage.svelte')
  }),
  [paths.home.path]: wrap({
    asyncComponent: () => import('@/components/pages/HomePage.svelte'),
    conditions: [isLoggedIn]
  }),
  [paths.friendGroups.path]: wrap({
    asyncComponent: () => import('@/components/pages/FriendGroupsPage.svelte'),
    conditions: [isLoggedIn]
  }),
  [paths.friendGroupsCreate.path]: wrap({
    asyncComponent: () => import('@/components/pages/FriendGroupFormPage.svelte'),
    conditions: [isLoggedIn],
    props: { edit: false }
  }),
  [paths.friendGroupsEdit.path]: wrap({
    asyncComponent: () => import('@/components/pages/FriendGroupFormPage.svelte'),
    conditions: [isLoggedIn],
    props: { edit: true }
  }),
  [paths.register.path]: wrap({
    asyncComponent: () => import('@/components/pages/AuthPage.svelte')
  }),
  [paths.designSystem]: wrap({
    asyncComponent: () => import('@/components/pages/DesignSystemPage.svelte'),
    conditions: [() => env === 'development']
  })
  // Catch-all route last
  // [paths.notFound]: wrap({
  //   asyncComponent: () => import('@/components/pages/NotFoundPage.svelte')
  // })
};
