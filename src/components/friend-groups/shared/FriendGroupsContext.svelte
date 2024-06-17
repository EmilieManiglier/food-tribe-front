<script lang="ts">
  import { setContext } from 'svelte';

  import type { FriendGroup, FriendGroupContextValue } from '@/definitions';
  import { useApi } from '@/store';

  const {
    call: friendGroupCall,
    data: friendGroups,
    loading: friendGroupsLoading
  } = useApi<FriendGroup[]>();

  const getFriendGroups = async () => {
    await friendGroupCall({ url: '/friendGroups', method: 'get' });
  };

  setContext<FriendGroupContextValue>('friend-groups', {
    getFriendGroups,
    friendGroups,
    friendGroupsLoading
  });
</script>

<slot />
