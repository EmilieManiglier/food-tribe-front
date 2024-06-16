import '@/assets/styles/index.scss';
import App from '@/App.svelte';

import { setupI18n } from '@/translations';

// Load translations
setupI18n();

const app = new App({
  target: document.getElementById('app')
});

export default app;
