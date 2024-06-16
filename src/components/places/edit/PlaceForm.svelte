<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  import { Button, FormInput, FormSelect } from '@/components';
  import type { Category, Place } from '@/definitions';
  import { useApi } from '@/store';
  import { displayToast } from '@/helpers';
  import { _ } from '@/translations';

  export let place: Place;
  export let categories: Category[] = place.categories || [];
  export let edit: boolean = false;

  let form: Place = {
    name: '',
    lat: 0,
    lng: 0,
    id: null,
    categories: []
  };

  const dispatch = createEventDispatcher();
  const {
    call: createPlaceCall,
    data: newPlace,
    loading: createLoading
  } = useApi<Place>();
  const { call: updatePlaceCall, status: updateStatus } = useApi();

  onMount(() => {
    edit && prefillForm();
  });

  const prefillForm = () => {
    if (!place) return;
    form = {
      name: place.name || '',
      lat: place.lat,
      lng: place.lng,
      id: place.id || null,
      categories: place.categories || []
    };
  };

  const handleSubmit = () => {
    edit ? updatePlace() : createPlace();
  };

  const createPlace = async () => {
    if (!form.name) return;
    form = { ...form, lat: place.lat, lng: place.lng };
    await createPlaceCall({ url: '/places', method: 'post', params: form });

    if (newPlace) {
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
    await updatePlaceCall({ url: `/places/${form.id}`, method: 'put', params: form });

    if ($updateStatus === 200) {
      displayToast('success', $_('place.edit.success', { values: { name: form.name } }));
      dispatch('edited', form);
    } else {
      displayToast('error', $_('place.edit.error'));
    }
  };
</script>

<form class="flex flex-col gap-y-8" on:submit|preventDefault={handleSubmit}>
  <FormInput name="name" label={$_('placeName')} bind:value={form.name} required />

  <FormSelect
    options={categories}
    name="categories"
    searchable
    placeholder={$_('placeholders.categories')}
    multiple
    selectLabel={$_('categories')}
    label="name"
    itemId="id"
    bind:value={form.categories}
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
