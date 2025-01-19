// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server',
  adapter: vercel(),
  env: {
    schema: {
      NEXT_SECRET_NOTION_API_KEY: envField.string({context:'server', access: 'secret'}),
      NEXT_PUBLIC_DATABASE_ID: envField.string({context:'server', access: 'public' })
    }
  }
});