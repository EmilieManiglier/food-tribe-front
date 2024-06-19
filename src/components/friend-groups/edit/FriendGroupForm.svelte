<script lang="ts">
  import { getContext } from 'svelte';
  import { push, params } from 'svelte-spa-router';
  import { toString, isEmpty } from 'lodash';

  import { Button, FormInput, FormTextArea } from '@/components';
  import type { FriendGroupContextValue, FriendGroup } from '@/definitions';
  import { paths } from '@/router';
  import { useApi, useCurrentUser } from '@/store';
  import { _ } from '@/translations';

  export let edit: boolean = false;
  let form: FriendGroup = {
    name: '',
    description: '',
    admin: null
  };

  const { currentUser } = useCurrentUser();
  const { getFriendGroup, friendGroup } =
    getContext<FriendGroupContextValue>('friend-groups');
  const { call: createGroupCall, status: createGroupStatus } = useApi<FriendGroup>({
    successMessage: $_('friendGroup.create.success'),
    errorMessage: $_('friendGroup.create.error')
  });
  const { call: editGroupCall, status: editGroupStatus } = useApi<FriendGroup>({
    successMessage: $_('friendGroup.edit.success'),
    errorMessage: $_('friendGroup.edit.error')
  });

  $: {
    if (edit && $params?.groupId && isEmpty($friendGroup)) {
      getEditDatas(toString($params.groupId));
    }
  }

  const getEditDatas = async (id: number) => {
    await getFriendGroup(id);

    // Prefill form with group data to edit
    if ($friendGroup) form = $friendGroup;
  };

  const handleSubmit = () => {
    edit ? updateGroup() : createGroup();
  };

  const setGroupAdmin = () => {
    // Set current user as default admin of the group to create
    form.admin = $currentUser?.id ?? null;
  };

  const createGroup = async () => {
    setGroupAdmin();
    await createGroupCall({ url: '/friendGroups', method: 'post', params: form });
    if ($createGroupStatus === 201) push(paths.friendGroups.path);
  };

  const updateGroup = async () => {
    await editGroupCall({ url: `/friendGroups/${form.id}`, method: 'put', params: form });
    if ($editGroupStatus === 200) push(paths.friendGroups.path);
  };
</script>

<div class="main-container">
  <h2 class="h2 mb-12">
    {$_(`friendGroup.${edit ? 'edit' : 'create'}.title`)}
  </h2>

  <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-5 max-w-lg">
    <FormInput label={$_('form.friendGroupName')} bind:value={form.name} required />
    <FormTextArea
      label={$_('form.description')}
      showOptional
      bind:value={form.description}
    />

    <!-- TODO: Add user invitation input -->

    <Button type="submit" className="w-fit">
      {$_('buttons.save')}
    </Button>
  </form>
</div>
