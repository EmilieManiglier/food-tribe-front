import { dictionary, locale, _, json, init, getLocaleFromNavigator } from 'svelte-i18n';
import * as fr from '@/translations/fr';

const setupI18n = ({ withLocale: _locale } = { withLocale: 'fr' }) => {
  init({
    fallbackLocale: 'fr',
    initialLocale: getLocaleFromNavigator()
  });

  dictionary.set({
    fr: {
      ...fr.auth,
      ...fr.common,
      ...fr.form,
      ...fr.place
    }
  });

  locale.set(_locale);
};

export { _, setupI18n, locale, json, dictionary };
