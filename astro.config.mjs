// @ts-check
import { defineConfig, envField } from 'astro/config';

import preact from '@astrojs/preact';
import tailwindcss from "@tailwindcss/vite";
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'server',
  adapter: vercel(),
  env: {
    schema: {
      NOTION_API_KEY: envField.string({context:'server', access: 'secret'}),
      DATABASE_ID: envField.string({context:'server', access: 'public' }),
      GOOGLE_API_KEY: envField.string({context: 'server', access: 'secret'})
    }
  }
});