// @ts-check
import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    sitemap({
      // Páginas que hoy redirigen a /enconstruccion: no tiene sentido indexarlas.
      filter: (page) =>
        !/\/(nosotros|historia|ministerios|enconstruccion)(\/|$)/.test(new URL(page).pathname),
    }),
  ],
  site: "https://www.icepilar.org",

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["gsap", "lenis"],
    },
  },
  output: "server",
  adapter: vercel(),
  env: {
    schema: {
      NOTION_API_KEY: envField.string({ context: "server", access: "secret" }),
      DATABASE_ID: envField.string({ context: "server", access: "public" }),
      SITE: envField.string({ context: "server", access: "public" }),
      AIRTABLE_TOKEN: envField.string({ context: "server", access: "secret", optional: true }),
      AIRTABLE_BASE_ID: envField.string({ context: "server", access: "secret", optional: true }),
      AIRTABLE_TABLE: envField.string({ context: "server", access: "public", default: "Inscripciones" }),
    },
  },
});

