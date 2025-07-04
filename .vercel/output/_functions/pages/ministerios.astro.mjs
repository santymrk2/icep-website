import { a as createComponent, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_JmoDyaQI.mjs';
import { $ as $$Layout } from '../chunks/Layout_CZi0mQfs.mjs';
import { C as Card } from '../chunks/Card_DXw4XR2x.mjs';
import { s as stories } from '../chunks/ministerios_CvMuztSr.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Ministerios = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "ICEP | Ministerios" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="flex flex-col justify-center items-center py-16"> <div class="flex flex-col justify-center items-center text-center mb-32 py-16"> <h1 class="text-3xl font-bold p-4">Nuestros Ministerios</h1> <p class="text-sm p-4">
Conoce nuestros espacios en donde nos desarrollamos como iglesia.
</p> </div> <div class="container mx-auto px-10 sm:px-20 lg:px-32 xl:px-64 grid gap-8 grid-cols-1 md:grid-cols-2"> ${stories.map((story) => renderTemplate`${renderComponent($$result2, "Card", Card, { "bg": story.bg, "title": story.title, "desc": story.desc, "logo": story.logo, "href": story.href })}`)} </div> </section> ` })}`;
}, "/Users/santiagomercadocarbone/Documents/Develops/icepilar/icep-website/src/pages/ministerios.astro", void 0);

const $$file = "/Users/santiagomercadocarbone/Documents/Develops/icepilar/icep-website/src/pages/ministerios.astro";
const $$url = "/ministerios";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ministerios,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
