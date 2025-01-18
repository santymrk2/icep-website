import { c as createComponent, r as renderTemplate, a as addAttribute, b as renderHead, d as renderComponent, g as renderSlot, h as createAstro } from './astro/server_DujD4fpc.mjs';
/* empty css                                           */
import { $ as $$Header, a as $$Footer } from './Footer_BCFc9V33.mjs';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Iglesia Cristiana Evang\xE9lica en Pilar - Sitio Oficial" } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/LogoWhite.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="min-h-screen font-sans bg-white"> ${renderComponent($$result, "Header", $$Header, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/home/santymrk2/Develops/icep-website/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
