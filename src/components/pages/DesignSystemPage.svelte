<script lang="ts">
  import { faCheck, faUtensils } from '@fortawesome/free-solid-svg-icons';
  import { Modal, Icon, FormInput, FormSelect } from '@/components';
  import tailwindStyles from '@/assets/styles/tailwind-styles.json';

  let simpleModalOpen = false;
  let hasSubmitForm = false;
  let form = {
    email: '',
    password: '',
    categories: [],
    singleCategory: null
  };

  let categories = [
    { value: 5, label: 'Fast-food' },
    { value: 4, label: 'Boulangerie' },
    { value: 3, label: 'Café' },
    { value: 2, label: 'Bar' },
    { value: 1, label: 'Restaurant' }
  ];

  const handleSubmit = () => {
    hasSubmitForm = true;
  };
</script>

<div class="bg-purple-300 p-8 mb-8 lg:p-16">
  <h1 class="h1">Design system</h1>
</div>

<div class="grid grid-cols-12 gap-8 p-4">
  <div class="col-span-12 lg:col-span-4">
    <p class="h3 mb-2">Base</p>
    <ul class="mb-12">
      <li>
        <a href="#section-buttons">Boutons</a>
      </li>
      <li>
        <a href="#section-colors">Couleurs</a>
      </li>
      <li>
        <a href="#section-typography">Typographie</a>
      </li>
    </ul>

    <p class="h3 mb-2">Composant</p>
    <ul>
      <li>
        <a href="#section-badges">Badges</a>
      </li>
      <li>
        <a href="#section-icons">Icônes</a>
      </li>
      <li>
        <a href="#section-modals">Modales</a>
      </li>
      <li>
        <a href="#section-forms">Formulaires</a>
      </li>
    </ul>
  </div>

  <div class="pb-24 col-span-12 lg:col-span-8">
    <h2 id="section-buttons" class="h2 mb-6">Boutons</h2>

    <div class="flex items-center gap-4">
      <button type="button" class="btn">Bouton</button>
      <button type="button" class="btn outlined">Bouton</button>
    </div>

    <h2 id="section-colors" class="h2 mt-12 mb-6">Couleurs</h2>

    {#each Object.entries(tailwindStyles.colors) as [colorName, variants]}
      <div class="flex items-center flex-wrap gap-4 mb-6">
        {#each Object.entries(variants) as [variant, hexCode]}
          <div
            class="flex items-end shrink-0 w-44 h-32 min-h-[128px] rounded-md overflow-hidden shadow-md {`bg-${colorName}-${variant}`}"
          >
            <div class="bg-white w-full p-2 text-center">
              <span class="block">{`bg-${colorName}-${variant}`}</span>
              <span class="bloc">{hexCode}</span>
            </div>
          </div>
        {/each}
      </div>
    {/each}

    <h2 id="section-typography" class="h2 mt-12 mb-6">Typographie</h2>

    <p class="mb-4">Les titres sont écrits en {tailwindStyles.fontFamily.title[0]}</p>
    <p class="h1 mb-4">Titre de niveau 1</p>
    <p class="h2 mb-4">Titre de niveau 2</p>
    <p class="h3 mb-8">Titre de niveau 3</p>
    <p class="mb-4 font-bold">
      Le contenu est écrit en {tailwindStyles.fontFamily.text[0]}
    </p>
    <p>
      Fugiat ad commodo Lorem aliqua cupidatat aliquip dolore. Sunt veniam deserunt
      ullamco labore ut Lorem aliqua nostrud amet non adipisicing irure excepteur dolore.
      Nulla ad ipsum enim minim deserunt. Quis duis dolor dolor pariatur exercitation
      adipisicing enim deserunt sunt deserunt. Laboris cillum voluptate qui dolore cillum
      dolor veniam eu anim labore laboris nostrud excepteur sit consequat. Nulla ad elit
      aute labore ad eiusmod aliqua. Ad mollit elit dolore veniam.
    </p>

    <h2 id="section-badges" class="h2 mt-12 mb-6">Badges</h2>

    <span class="badge">Badge Primary</span>
    <span class="badge secondary">Badge Secondary</span>
    <span class="badge accent">Badge Accent</span>

    <h2 id="section-icons" class="h2 mt-12 mb-6">Icônes</h2>
    <div class="flex gap-4">
      <Icon name={faCheck} />
      <Icon name={faUtensils} className="text-primary-500" />
    </div>

    <h2 id="section-modals" class="h2 mt-12 mb-6">Modales</h2>

    <button type="button" class="btn" on:click={() => (simpleModalOpen = true)}>
      Ouvrir la modale
    </button>

    <Modal bind:open={simpleModalOpen} size="small">
      <p slot="header" class="h3 mb-8">
        Pour ajouter ce lieu dans votre liste, veuillez compléter les informations
        suivantes
      </p>

      <div slot="body">Contenu de la modale</div>
    </Modal>

    <h2 id="section-forms" class="h2 mt-12 mb-6">Formulaires</h2>

    <div class="flex flex-col gap-4 lg:flex-row">
      <form class="flex flex-col gap-4 lg:w-1/2" on:submit|preventDefault={handleSubmit}>
        <FormInput bind:value={form.email} name="email" type="email" label="Email" />
        <FormInput
          bind:value={form.password}
          name="password"
          type="password"
          label="Mot de passe"
        />

        <FormSelect
          options={categories}
          name="categories"
          searchable
          multiple
          selectLabel="Select multiple"
          placeholder="Sélectionner une ou plusieurs catégorie(s)"
          bind:value={form.categories}
        />

        <FormSelect
          options={categories}
          name="singleCategory"
          selectLabel="Select simple"
          placeholder="Sélectionner une catégorie"
          bind:value={form.singleCategory}
        />

        <button type="submit" class="btn">Valider</button>
      </form>

      {#if hasSubmitForm}
        <div class="lg:w-1/2">
          <h3 class="h3 mb-6">Formulaire soumis avec succès ! 🎉</h3>
          <code class="block whitespace-pre">
            {JSON.stringify(form, null, 2)}
          </code>
        </div>
      {/if}
    </div>
  </div>
</div>
