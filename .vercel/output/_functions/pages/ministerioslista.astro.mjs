/* empty css                                                   */
import { c as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead, a as addAttribute } from '../chunks/astro/server_DujD4fpc.mjs';
import { $ as $$Layout } from '../chunks/Layout_HKOG5EJD.mjs';
import { P as Paths } from '../chunks/Footer_BAjPlQLp.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$MinisteriosLista = createComponent(($$result, $$props, $$slots) => {
  const minItems = Paths.filter((x) => x.text == "Ministerios")[0].subitems;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "ICEP | Ministerios" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="my-4"> ${minItems?.map((min, index) => renderTemplate`<div class="flex flex-col justify-center shadow-lg rounded-xl bg-white m-6 sm:m-10 gap-4"> <a class="text-3xl font-bold text-center py-6"${addAttribute(min.href, "href")}> ${min.text} </a> </div>`)} </section> ` })}`;
}, "/home/santymrk2/Develops/icep-website/src/pages/ministeriosLista.astro", void 0);

const $$file = "/home/santymrk2/Develops/icep-website/src/pages/ministeriosLista.astro";
const $$url = "/ministeriosLista";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$MinisteriosLista,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
