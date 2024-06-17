<script lang="ts">
  import type { User } from '@/definitions';

  export let user: User;
</script>

<div>
  <!-- TODO : display user avatar once API is ready -->
  <!-- <img src={user.avatar} alt={user.firstname} class="rounded-full w-12 h-12" /> -->
  <div
    class="bg-primary-500 rounded-full p-4 w-12 h-12 flex-center-center border border-white"
  >
    {user.firstname[0]}{user.lastname[0]}
  </div>
</div>
