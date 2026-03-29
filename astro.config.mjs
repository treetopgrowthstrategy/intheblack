import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://intheblack.coffee',
  integrations: [tailwind()],
  output: 'static',
});
