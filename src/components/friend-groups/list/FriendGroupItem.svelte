<script lang="ts">
  import {
    faEllipsisVertical,
    faEye,
    faPenToSquare,
    faTrashAlt
  } from '@fortawesome/free-solid-svg-icons';
  import { link } from 'svelte-spa-router';
  import { getContext } from 'svelte';

  import { Avatar, Button, Dropdown, Icon, Modal } from '@/components';
  import type { FriendGroupContextValue, FriendGroup } from '@/definitions';
  import { _ } from '@/translations';
  import { paths } from '@/router';
  import { useCurrentUser } from '@/store';

  export let group: FriendGroup;
  export let adminName: string = '';

  let deleteModalOpen = false;

  const { currentUser } = useCurrentUser();
  const { deleteFriendGroup } = getContext<FriendGroupContextValue>('friend-groups');

  const onDeleteFriendGroup = async () => {
    if (!group.id) return;
    await deleteFriendGroup(group.id);
    deleteModalOpen = false;
  };
</script>

<div
  class="bg-white shadow-md w-72 min-h-[20rem] py-4 px-8 flex-center-center flex-col gap-8 relative"
>
  <div class="absolute top-0 right-0 z-10">
    <Dropdown position="bottom-center">
      <div slot="trigger" class="p-4">
        <Icon name={faEllipsisVertical} />
        <span class="sr-only">{$_('friendGroup.actions.members')}</span>
      </div>

      <div slot="dropdown-content" class="min-w-[12rem]">
        <!-- TODO : handle dropdown actions -->
        <button class="w-full px-4 py-2 flex items-center gap-2 hover:bg-purple-200">
          <Icon name={faEye} />
          {$_('friendGroup.actions.members')}
        </button>
        <a
          href={`${paths.friendGroupsEdit.shortPath}/${group.id}`}
          use:link
          class="w-full px-4 py-2 flex items-center gap-2 hover:bg-purple-200"
        >
          <Icon name={faPenToSquare} />
          {$_('buttons.edit')}
        </a>
        {#if $currentUser?.id === group.admin}
          <button
            type="button"
            class="w-full px-4 py-2 flex items-center gap-2 hover:bg-purple-200"
            on:click={() => (deleteModalOpen = true)}
          >
            <Icon name={faTrashAlt} className="text-red-500" />
            {$_('buttons.delete')}
          </button>
        {/if}
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
    <span class="inline-block">
      {$_('friendGroup.members', { values: { n: group.users?.length || 1 } })}
    </span>
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

<!-- Delete Modal -->
<Modal bind:open={deleteModalOpen} size="small">
  <p slot="header" class="h2">{group.name}</p>

  <div slot="body" class="my-12 text-center">
    <div class="flex-center-center bg-red-100 p-4 rounded-full w-14 h-14 mx-auto mb-4">
      <Icon name={faTrashAlt} size="lg" className="text-red-500" />
    </div>

    <p class="font-bold mb-2">
      {$_('friendGroup.delete.title')}
    </p>

    <p>{$_('friendGroup.delete.content')}</p>
  </div>

  <div slot="footer" class="flex items-center justify-between">
    <Button className="small outlined" on:click={() => (deleteModalOpen = false)}>
      {$_('buttons.cancel')}
    </Button>

    <Button className="small" on:click={onDeleteFriendGroup}>
      {$_('buttons.confirm')}
    </Button>
  </div>
</Modal>
