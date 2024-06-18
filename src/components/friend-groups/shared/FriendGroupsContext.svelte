<script lang="ts">
  import { setContext } from 'svelte';

  import type { FriendGroup, FriendGroupContextValue } from '@/definitions';
  import { useApi } from '@/store';
  import { _ } from '@/translations';

  const {
    call: friendGroupsCall,
    data: friendGroups,
    loading: friendGroupsLoading
  } = useApi<FriendGroup[] | null>();

  const {
    call: friendGroupCall,
    data: friendGroup,
    loading: friendGroupLoading
  } = useApi<FriendGroup>();

  const { call: deleteFriendGroupCall, loading: deleteFriendGroupLoading } = useApi({
    successMessage: $_('friendGroup.delete.success'),
    errorMessage: $_('friendGroup.delete.error')
  });

  const getFriendGroups = async () => {
    await friendGroupsCall({ url: '/friendGroups', method: 'get' });
  };

  const getFriendGroup = async (id: number) => {
    await friendGroupCall({ url: `/friendGroups/${id}`, method: 'get' });
  };

  const deleteFriendGroup = async (id: number) => {
    await deleteFriendGroupCall({ url: `/friendGroups/${id}`, method: 'delete' });
    if ($friendGroups && $friendGroups.length) {
      const updatedFriendGroups = $friendGroups.filter((group) => group.id !== id);
      friendGroups.set(updatedFriendGroups);
    }
  };

  setContext<FriendGroupContextValue>('friend-groups', {
    // Friend groups list
    getFriendGroups,
    friendGroups,
    friendGroupsLoading,
    // Friend group edit
    getFriendGroup,
    friendGroup,
    friendGroupLoading,
    // Friend group delete
    deleteFriendGroup,
    deleteFriendGroupLoading
  });
</script>

<slot />
