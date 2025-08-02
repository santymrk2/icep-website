import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BhUVXp0I.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_DD4i86gh.mjs';
export { renderers } from '../renderers.mjs';

const $$Enconstruccion = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "En consturccion " }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="text-center py-100 "> <h1 class="text-4xl font-bold">🚧 Página en construcción</h1> <p class="text-xl mt-4">Estamos trabajando para traerte esta sección pronto.</p> <a href="/" class="text-primary text-lg font-bold mt-6 inline-block">Volver al inicio</a> </div> ` })}`;
}, "/Users/santiagomercadocarbone/Documents/Develops/icepilar/icep-website/src/pages/enconstruccion.astro", void 0);

const $$file = "/Users/santiagomercadocarbone/Documents/Develops/icepilar/icep-website/src/pages/enconstruccion.astro";
const $$url = "/enconstruccion";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Enconstruccion,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
