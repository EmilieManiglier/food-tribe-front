<script lang="ts">
  import { FriendGroupForm, FriendGroupsContext } from '@/components';

  export let edit: boolean = false;
</script>

<FriendGroupsContext>
  <FriendGroupForm {edit} />
</FriendGroupsContext>
