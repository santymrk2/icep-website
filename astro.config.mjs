// @ts-check
import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap()],
  site: "https://www.icepilar.org",

  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: vercel(),
  env: {
    schema: {
      NOTION_API_KEY: envField.string({ context: "server", access: "secret" }),
      DATABASE_ID: envField.string({ context: "server", access: "public" }),
      GOOGLE_API_KEY: envField.string({ context: "server", access: "secret" }),
      SITE: envField.string({ context: "server", access: "public" }),
    },
  },
});
