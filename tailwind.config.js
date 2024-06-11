/** @type {import('tailwindcss').Config} */

import tailwindStyles from './src/assets/styles/tailwind-styles.json';

export default {
  content: ['./index.html', './src/**/*.{ts,svelte}'],
  theme: {
    extend: { ...tailwindStyles }
  },
  safelist: [
    {
      pattern: /(bg)-(.*)-(\d{1}0{1,2})/,
      variants: ['hover']
    }
  ]
};
