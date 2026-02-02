// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import svelte from '@astrojs/svelte';

import sitemap from '@astrojs/sitemap';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https:joinus.orkneyislands.uk',
  output: 'hybrid',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [tailwind(), svelte(), sitemap()]
});