import { c as createComponent, r as renderComponent, a as renderTemplate, b as addAttribute, m as maybeRenderHead } from '../chunks/astro/server_BGVT8zRX.mjs';
import { $ as $$Layout } from '../chunks/Layout_CqOWlENl.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Mujeres = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Ministerios", $$Layout, { "title": "ICEP | Mujeres" }, { "content": ($$result2) => renderTemplate`${maybeRenderHead()}<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex flex-col justify-center items-center space-y-8"></div> </section>`, "default": ($$result2) => renderTemplate` <meta http-equiv="refresh"${addAttribute(`0;url=/`, "content")}>   `, "title": ($$result2) => renderTemplate`<h1 class="text-3xl font-bold ">Mujeres</h1>` })}`;
}, "/home/santymrk2/Develops/icep-website/src/pages/mujeres.astro", void 0);

const $$file = "/home/santymrk2/Develops/icep-website/src/pages/mujeres.astro";
const $$url = "/mujeres";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Mujeres,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
