import path from 'path-browserify';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess()
    }),
    viteTsconfigPaths()
  ],
  optimizeDeps: { exclude: ['svelte-navigator'] },
  resolve: {
    dedupe: ['svelte'],
    alias: {
      path: 'path-browserify',
      '@': path.resolve(__dirname, './src')
    }
  }
});
