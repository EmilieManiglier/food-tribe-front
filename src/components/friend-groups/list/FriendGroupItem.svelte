<script lang="ts">
  import { Avatar } from '@/components';
  import type { FriendGroup } from '@/definitions';

  export let group: FriendGroup;
  export let adminName: string = '';
</script>

<div
  class="bg-white shadow-md w-72 min-h-[19.5rem] py-4 px-8 flex-center-center flex-col gap-8"
>
  <div class="flex-center-center flex-col">
    <p class="h3 mb-1">{group.name}</p>

    {#if group.description}
      <p class="text-gray-700 mb-1 truncate-line two-lines text-center">
        {group.description}
      </p>
    {/if}
    {#if adminName}
      <span class="text-sm text-gray-600">Créé par {adminName}</span>
    {/if}
  </div>

  <div class="flex-center-center flex-col">
    <span class="inline-block text-3xl text-purple-500">
      {#if group.users}
        {group.users.length}
      {:else}
        0
      {/if}
    </span>
    <span class="inline-block">membres</span>
  </div>

  {#if group.users && group.users.length > 0}
    <div class="flex {group.users.length > 3 ? '-space-x-3' : 'gap-2'}">
      {#each group.users.slice(0, 4) as user}
        <Avatar {user} />
      {/each}
      {#if group.users.length > 4}
        <div
          class="bg-gray-200 rounded-full w-12 h-12 flex-center-center border border-white"
        >
          +{group.users.length - 4}
        </div>
      {/if}
    </div>
  {/if}
</div>
