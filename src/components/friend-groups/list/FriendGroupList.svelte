<script lang="ts">
  import { faPlus } from '@fortawesome/free-solid-svg-icons';
  import { isEmpty } from 'lodash';
  import { getContext, onMount } from 'svelte';

  import type { FriendGroupContextValue, User } from '@/definitions';
  import { Button, FriendGroupItem, Icon } from '@/components';
  import { _ } from '@/translations';

  let skeletonsArray = Array.from({ length: 5 }, (_, i) => i + 1);

  const { getFriendGroups, friendGroups, friendGroupsLoading } =
    getContext<FriendGroupContextValue>('friend-groups');

  onMount(() => getFriendGroups());

  const getAdminName = (index: number): string => {
    const admin = $friendGroups[index].users?.find(
      (user: User) => user.id === $friendGroups[index].admin
    );
    if (!admin) return '';
    return `${admin.firstname} ${admin.lastname}`;
  };
</script>

<div class="main-container bg-purple-200 min-h-screen">
  <div class="flex-center-between flex-wrap mb-12">
    <h2 class="h2">{$_('friendGroup.groups')}</h2>

    <Button>
      {$_('friendGroup.create.cta')}
      <Icon name={faPlus} />
    </Button>
  </div>

  {#if $friendGroupsLoading}
    {#each skeletonsArray as _}
      <div class="mb-12 bg-white p-4 max-w-lg">
        <div class="skeleton w-3/4 h-4 lg:w-1/2 mb-4" />
        <div class="skeleton w-4/5 h-4 rounded-md" />
      </div>
    {/each}
  {/if}

  {#if !$friendGroupsLoading}
    {#if !isEmpty($friendGroups)}
      <div class="flex items-center gap-4">
        {#each $friendGroups as group, index}
          <FriendGroupItem {group} adminName={getAdminName(index)} />
        {/each}
      </div>
    {:else}
      <p class="text-center">
        {$_('friendGroups.noGroups')}
      </p>
    {/if}
  {/if}
</div>
