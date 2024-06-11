import eslintPluginSvelte from 'eslint-plugin-svelte';
import prettierConfig from 'eslint-plugin-prettier/recommended';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  ...eslintPluginSvelte.configs['flat/recommended'],
  ...eslintPluginSvelte.configs['flat/prettier'],
  {
    files: ['**/*.ts', '**/*.svelte'],
    plugins: {
      prettierPlugin
    }
  },
  prettierConfig
];
