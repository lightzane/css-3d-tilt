import { defineConfig } from 'vite';
import { resolve } from 'path';

const r = (path: string) => resolve(__dirname, path);

const root = r('src');
const outDir = r('dist');
const publicDir = r('public');

const page = (path: string) => resolve(root, path);

export default defineConfig({
  appType: 'mpa', // the extra '/' at the end of every URL path matters
  base: '',
  root,
  publicDir,
  build: {
    outDir,
    emptyOutDir: true, // explicit true since 'dist' is NOT a sub-directory of 'src'
    rollupOptions: {
      input: {
        main: page('index.html'),
        'css-only': page('css-only.html'),
      },
    },
  },
});
