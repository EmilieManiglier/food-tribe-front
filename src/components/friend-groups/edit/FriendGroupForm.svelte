<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import { push } from 'svelte-spa-router';

  import { Button, FormInput, FormTextArea } from '@/components';
  import type { FriendGroupContextValue, FriendGroup } from '@/definitions';
  import { displayToast } from '@/helpers';
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
  const { getFriendGroup } = getContext<FriendGroupContextValue>('friend-groups');
  const { call: createGroupCall, status: createGroupStatus } = useApi<FriendGroup>();

  onMount(() => {
    if (edit) prefillForm();
  });

  const prefillForm = () => {
    // Prefill form with group data to edit
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
    console.log(form);
    await createGroupCall({ url: '/friendGroups', method: 'post', params: form });

    if ($createGroupStatus === 201) {
      push(paths.friendGroups.path);
      displayToast('success', $_('friendGroup.create.success'));
    } else {
      displayToast('error', $_('friendGroup.create.error'));
    }
  };

  const updateGroup = () => {
    console.log('update', form);
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
