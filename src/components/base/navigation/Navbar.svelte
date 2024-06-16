<script lang="ts">
  import {
    faChevronDown,
    faHouse,
    faKitchenSet,
    faUserGroup,
    faUtensils
  } from '@fortawesome/free-solid-svg-icons';
  import { useNavigate } from 'svelte-navigator';

  import { Dropdown, Icon, NavLink } from '@/components';
  import { routes } from '@/router';
  import { useApi, useCurrentUser } from '@/store';
  import { displayToast } from '@/helpers';

  let menuOpen = false;

  const navigate = useNavigate();
  const { currentUser, initials } = useCurrentUser();
  const { call: logoutCall, status: logoutStatus, loading: logoutLoading } = useApi();

  const logoutUser = async () => {
    await logoutCall({ url: '/auth/logout', method: 'post' });
    if ($logoutStatus === 200) {
      if (menuOpen) menuOpen = false;
      currentUser.set(null);
      navigate(routes.login.path);
    } else {
      displayToast('error', 'Une erreur est survenue, veuillez réessayer plus tard');
    }
  };
</script>

<header>
  <nav class="text-gray-700 shadow-sm border-b-2 border-purple-300 lg:border-none">
    <div class="flex-center-between gap-4 px-4 py-2 bg-white relative z-50 lg:hidden">
      <a href="/" class="h1">Food Tribe</a>

      <button
        type="button"
        class="btn-menu-mobile {menuOpen ? 'open' : ''}"
        on:click={() => (menuOpen = !menuOpen)}
      >
        <span class="bar" />
        <span class="bar" />
      </button>
    </div>

    <ul class="nav-menu {menuOpen ? 'open' : ''}">
      <div class="grow">
        <a href="/" class="h1 hidden lg:block lg:p-6 lg:pb-12">Food Tribe</a>

        <li>
          <NavLink to={routes.home.path} icon={faHouse}>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/places" icon={faUtensils}>Favoris</NavLink>
        </li>
        <li>
          <NavLink to="/cuisines" icon={faKitchenSet}>Cuisines</NavLink>
        </li>
        <li>
          <NavLink to="/amis" icon={faUserGroup}>Amis</NavLink>
        </li>
      </div>
      {#if $currentUser}
        <li>
          <Dropdown>
            <div
              slot="trigger"
              class="p-4 flex-center-between gap-4"
              let:open={dropdownOpen}
            >
              <div class="dropdown-trigger {dropdownOpen ? 'open' : ''}">
                <span class="truncate-line two-lines text-left">
                  {$currentUser.firstname}
                  {$currentUser.lastname}
                </span>
                <Icon name={faChevronDown} className="dropdown-icon" />
              </div>

              <div class="bg-primary-500 rounded-full p-4 w-12 h-12 flex-center-center">
                {initials()}
              </div>
            </div>

            <svelte:fragment slot="dropdown-content">
              <a href="/profile" class="block p-4 w-full hover:bg-purple-200">Profil</a>
              <button
                type="button"
                class="p-4 w-full text-left hover:bg-purple-200"
                disabled={$logoutLoading}
                on:click={logoutUser}
              >
                Se déconnecter
              </button>
            </svelte:fragment>
          </Dropdown>
        </li>
      {/if}
    </ul>
  </nav>
</header>

<style lang="scss" scoped>
  .nav-menu {
    background-color: #fff;
    position: fixed;
    transform: translateY(-100%);
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 3.5rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    transition: transform 500ms ease-in-out;
    z-index: 40;
  }

  .nav-menu.open {
    transform: translateY(0);
    top: 3.5rem;
  }

  .btn-menu-mobile {
    .bar {
      width: 3.13rem;
      height: 0.19rem;
      margin-top: 0.56rem;
      margin-bottom: 0.56rem;
      background-color: theme('colors.primary.500');
      display: block;
      transition: transform 0.5s ease-in-out;

      &:nth-of-type(1) {
        width: 75%;
        margin-left: auto;
      }
    }

    &.open {
      .bar:nth-of-type(1) {
        transform: translate3d(0, 0.38rem, 0) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg)
          rotateZ(45deg) skew(0deg, 0deg);
        transform-style: preserve-3d;
        width: 2.5rem;
      }

      .bar:nth-of-type(2) {
        transform: translate3d(0.06rem, -0.38rem, 0) scale3d(1, 1, 1) rotateX(0deg)
          rotateY(0deg) rotateZ(-45deg) skew(0deg, 0deg);
        transform-style: preserve-3d;
        width: 2.5rem;
      }
    }
  }

  .dropdown-trigger :global(.dropdown-icon) {
    transition: all 200ms ease-in-out;
  }

  .dropdown-trigger.open :global(.dropdown-icon) {
    transform: rotate(180deg);
  }

  .dropdown-trigger {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  @media (min-width: 1024px) {
    .nav-menu {
      transform: translateY(0);
      top: 0;
      bottom: 0;
      left: 0;
      height: 100%;
      max-height: 100vh;
      width: 16rem;
      max-width: 16rem;
      border-right: 0.13rem solid theme('colors.purple.300');
      padding-top: 3rem;
    }
  }
</style>
