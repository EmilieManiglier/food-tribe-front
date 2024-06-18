<script lang="ts">
  import {
    faEllipsisVertical,
    faEye,
    faPenToSquare,
    faTrashAlt
  } from '@fortawesome/free-solid-svg-icons';
  import { Avatar, Dropdown, Icon } from '@/components';
  import type { FriendGroup } from '@/definitions';
  import { _ } from '@/translations';

  export let group: FriendGroup;
  export let adminName: string = '';
</script>

<div
  class="bg-white shadow-md w-72 min-h-[19.5rem] py-4 px-8 flex-center-center flex-col gap-8 relative"
>
  <div class="absolute top-0 right-0 z-10">
    <Dropdown position="bottom-center">
      <div slot="trigger" class="p-4">
        <Icon name={faEllipsisVertical} />
        <span class="sr-only">{$_('friendGroup.actions.members')}</span>
      </div>

      <div slot="dropdown-content" class="min-w-[12rem]">
        <button class="w-full px-4 py-2 flex items-center gap-2 hover:bg-purple-200">
          <Icon name={faEye} />
          {$_('friendGroup.actions.members')}
        </button>
        <button class="w-full px-4 py-2 flex items-center gap-2 hover:bg-purple-200">
          <Icon name={faPenToSquare} />
          {$_('buttons.edit')}
        </button>
        <button class="w-full px-4 py-2 flex items-center gap-2 hover:bg-purple-200">
          <Icon name={faTrashAlt} className="text-red-500" />
          {$_('buttons.delete')}
        </button>
      </div>
    </Dropdown>
  </div>

  <div class="flex-center-center flex-col">
    <p class="h3 mb-1 truncate-line one-line">{group.name}</p>

    {#if group.description}
      <p class="text-gray-700 mb-1 truncate-line two-lines text-center">
        {group.description}
      </p>
    {/if}
    {#if adminName}
      <span class="text-sm text-gray-600">
        {$_('friendGroup.createdBy', { values: { name: adminName } })}
      </span>
    {/if}
  </div>

  <div class="flex-center-center flex-col">
    <span class="inline-block text-3xl text-purple-500 lg:text-4xl">
      {#if group.users}
        {group.users.length}
      {:else}
        0
      {/if}
    </span>
    <span class="inline-block">{$_('friendGroup.members')}</span>
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
