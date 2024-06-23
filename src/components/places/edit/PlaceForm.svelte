<script lang="ts">
  import { toNumber } from 'lodash';
  import { createEventDispatcher, getContext, onMount } from 'svelte';
  import { geocoding, config, type GeocodingSearchResult } from '@maptiler/sdk';

  import { Button, FormInput, FormSelect, FormTextArea } from '@/components';
  import type { Category, FriendGroupContextValue, Option, Place } from '@/definitions';
  import { useApi } from '@/store';
  import { displayToast } from '@/helpers';
  import { _ } from '@/translations';

  config.apiKey = import.meta.env.VITE_APP_MAPTILER_API_KEY;

  export let place: Place;
  export let categories: Category[] = place.categories || [];
  export let edit: boolean = false;

  type PlaceForm = Place & {
    friendGroup?: Option;
  };

  let form: PlaceForm = {
    name: '',
    description: '',
    lat: 0,
    lng: 0,
    id: null,
    categories: [],
    friendGroup: { id: null, name: '' }
  };

  const dispatch = createEventDispatcher();
  const { friendGroups } = getContext<FriendGroupContextValue>('friend-groups');
  const {
    call: createPlaceCall,
    data: newPlace,
    loading: createLoading
  } = useApi<Place>();
  const { call: updatePlaceCall, status: updateStatus } = useApi<Place>();

  onMount(() => {
    edit && prefillForm();
  });

  const prefillForm = () => {
    if (!place) return;
    const groupLabel = $friendGroups?.find((group) => group.id === place.friendGroupId);
    form = {
      name: place.name || '',
      lat: place.lat,
      lng: place.lng,
      id: place.id || null,
      streetAddress: place.streetAddress || '',
      categories: place.categories || [],
      description: place.description || '',
      friendGroup: groupLabel || { id: null, name: '' }
    };
  };

  const handleSubmit = () => {
    edit ? updatePlace() : createPlace();
  };

  const formatFormParams = async () => {
    // Reverse geocoding to get the address from the coordinates
    const results: GeocodingSearchResult = await geocoding.reverse([
      place.lng,
      place.lat
    ]);
    let address = results.features[0].place_name;
    // Remove country from the address
    const lastCommaIndex = address.lastIndexOf(',');
    address = address.substring(0, lastCommaIndex);

    form = {
      ...form,
      lat: place.lat,
      lng: place.lng,
      streetAddress: edit ? form.streetAddress : address,
      friendGroupId: form.friendGroup?.id
        ? toNumber(form.friendGroup?.id)
        : $friendGroups?.[0]?.id
    };
    // Remove friendGroup from form as it is not needed in the API call
    delete form.friendGroup;
  };

  const createPlace = async () => {
    // TODO : add validations on form
    await formatFormParams();
    await createPlaceCall({ url: '/places', method: 'post', params: form });

    if ($newPlace) {
      // Dispatch to parent
      displayToast(
        'success',
        $_('place.create.success', { values: { name: form.name } })
      );
      dispatch('created', { ...form, id: $newPlace?.id });

      // Reset form
      form = { name: '', lat: 0, lng: 0, categories: [] };
    } else {
      displayToast('error', $_('place.create.error'));
    }
  };

  const updatePlace = async () => {
    await formatFormParams();
    await updatePlaceCall({ url: `/places/${form.id}`, method: 'put', params: form });

    if ($updateStatus === 200) {
      displayToast('success', $_('place.edit.success', { values: { name: form.name } }));
      dispatch('edited', form);
    } else {
      displayToast('error', $_('place.edit.error'));
    }
  };
</script>

<form class="flex flex-col gap-y-8 place-form" on:submit|preventDefault={handleSubmit}>
  <FormInput name="name" label={$_('form.placeName')} bind:value={form.name} required />

  <FormTextArea
    label={$_('form.description')}
    showOptional
    bind:value={form.description}
  />

  <FormSelect
    options={categories}
    name="categories"
    searchable
    placeholder={$_('form.placeholders.categories')}
    multiple
    selectLabel={$_('form.categories')}
    label="name"
    itemId="id"
    class="place-form-select"
    bind:value={form.categories}
  />

  <FormSelect
    name="friendGroup"
    options={$friendGroups || []}
    label="name"
    itemId="id"
    class="place-form-select"
    selectLabel={$_('form.friendGroup')}
    placeholder={$_('form.placeholders.friendGroup')}
    clearable={false}
    bind:value={form.friendGroup}
  />

  <div class="flex-center-between mt-4">
    <Button className="outlined" on:click={() => dispatch('close')}>
      {$_('buttons.cancel')}
    </Button>
    <Button type="submit" loading={$createLoading}>
      {$_('buttons.validate')}
    </Button>
  </div>
</form>

<style lang="scss" scoped>
  .place-form :global(.place-form-select) {
    --height: 3.5rem;
  }
</style>
