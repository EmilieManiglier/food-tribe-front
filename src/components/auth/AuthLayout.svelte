<script lang="ts">
  import { useLocation } from 'svelte-navigator';
  import bgAuth from '@/assets/img/bg-auth.jpeg';

  const location = useLocation();

  let pageName = $location.pathname.split('/').pop();
</script>

<div class="auth-layout {pageName}">
  <div class="auth-bg">
    <img src={bgAuth} alt="" class="w-full h-full object-cover" />
  </div>

  <div class="auth-content">
    <div class="auth-card">
      <slot name="form" />
    </div>

    <div class="auth-intro">
      <slot name="intro-title" />

      <p class="auth-description">
        <slot name="intro-description" />
      </p>
    </div>
  </div>
</div>

<style lang="scss">
  .auth-layout {
    position: relative;
    height: 100vh;

    &.inscription {
      .auth-content {
        top: 1rem;
        left: 1rem;
        transform: translate(-1rem, -1rem);
      }

      .auth-card {
        max-width: 45rem;
      }
    }
  }

  .auth-bg {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: theme('colors.purple.900');
      opacity: 0.4;
      z-index: 1;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 1;
      backdrop-filter: blur(0.7rem);
    }
  }

  .auth-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 2rem;
    width: 100%;
    padding: 0.75rem;
  }

  .auth-card {
    background-color: #fff;
    padding: 1.5rem;
    border-top: 0.13rem solid theme('colors.primary.500');
    box-shadow: 0 0.06rem 1.25rem 0.25rem rgba(0, 0, 0, 0.15);
    width: 100%;
    max-width: 28rem;
    flex-shrink: 0;
  }

  .auth-intro {
    color: #fff;
  }

  .auth-description {
    padding-left: 1.5rem;
    border-left: 0.25rem solid theme('colors.primary.500');
    width: 100%;
    max-width: 28rem;
  }

  @media screen and (min-width: 1024px) {
    .auth-bg {
      width: 80%;
      margin-left: auto;
    }

    .auth-content {
      left: 2rem;
      top: 2rem;
      transform: none;
      flex-direction: row;
      gap: 8rem;
    }

    .auth-layout.inscription {
      .auth-content {
        transform: none;
      }
    }
  }
</style>
