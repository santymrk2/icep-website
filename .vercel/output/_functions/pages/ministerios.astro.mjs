import { b as createAstro, c as createComponent } from '../chunks/astro/server_BhUVXp0I.mjs';
import 'kleur/colors';
import 'clsx';
import '../chunks/Layout_DD4i86gh.mjs';
import 'react/jsx-runtime';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://www.icepilar.org");
const prerender = false;
const $$Ministerios = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Ministerios;
  return Astro2.redirect("/enconstruccion");
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
