<script lang="ts">
  import { setContext } from 'svelte';

  import type { FriendGroup, FriendGroupContextValue } from '@/definitions';
  import { useApi } from '@/store';

  const { call: friendGroupCall, data: friendGroups } = useApi<FriendGroup[]>();

  const getFriendGroups = async () => {
    await friendGroupCall({ url: '/friendGroups', method: 'get' });
  };

  setContext<FriendGroupContextValue>('friend-groups', {
    getFriendGroups,
    friendGroups
  });
</script>

<slot />
