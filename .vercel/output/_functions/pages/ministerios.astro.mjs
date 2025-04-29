import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_BGVT8zRX.mjs';
import { P as Paths, $ as $$Layout } from '../chunks/Layout_CqOWlENl.mjs';
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Ministerios = createComponent(($$result, $$props, $$slots) => {
  Paths.filter((x) => x.text == "Ministerios")[0].subitems;
  const stories = [
    {
      title: "Activados",
      desc: "Un espacio para los j\xF3venes de ICEP, donde se busca conectar con Dios y entre nosotros.",
      logo: "src/assets/ministerios/activados/Imagotipo_white.svg",
      href: "/adolescentes",
      bg: "from-[#7cd604] to-[#7cd604]/50"
    },
    {
      title: "Pontifex",
      desc: "Un espacio para los j\xF3venes de ICEP, donde se busca conectar con Dios y entre nosotros.",
      logo: "src/assets/ministerios/jovenes/Imagotipo_white.svg",
      href: "/jovenes",
      bg: "from-[#F84B00] to-[#F84B00]/50"
    },
    {
      title: "Matrimonios",
      desc: "Un espacio para las mujeres de ICEP, donde se busca conectar con Dios y entre nosotros.",
      logo: null,
      href: "/matrimonios",
      bg: "from-zinc-900 to-zinc-900/50 "
    },
    {
      title: "Mujeres",
      desc: "Un espacio para las mujeres de ICEP, donde se busca conectar con Dios y entre nosotros.",
      logo: null,
      href: "/mujeres",
      bg: "from-zinc-900 to-zinc-900/50 "
    },
    {
      title: "Ni\xF1os",
      desc: "Un espacio para los ni\xF1os de ICEP, donde se busca conectar con Dios y entre nosotros.",
      logo: null,
      href: "/ninios",
      bg: "from-zinc-900 to-zinc-900/50"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "ICEP | Ministerios" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="py-16 "> <h2 class="sr-only">Customer Stories</h2> <div class="container mx-auto px-4 grid gap-8 grid-cols-1 sm:grid-cols-2"> ${stories.map((story) => renderTemplate`<a${addAttribute(story.href, "href")}${addAttribute(`relative rounded-2xl overflow-hidden bg-gradient-to-b ${story.bg} group transform transition-transform hover:-translate-y-1`, "class")}> <div class="relative w-full pt-[66%]"> ${story.logo ? renderTemplate`<img${addAttribute(story.logo, "src")}${addAttribute(story.title, "alt")} class="absolute inset-0 w-full h-full object-full transition-opacity duration-300 group-hover:opacity-0 p-8">` : renderTemplate`<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> <h2 class="text-white text-4xl font-bold text-center">${story.title}</h2> </div>`} <div class="absolute inset-0 flex items-center justify-center text-center bg-white bg-opacity-90 opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-4"> <h3 class="text-lg font-semibold text-gray-800">${story.desc}</h3> </div> </div> </a>`)} </div> </section> ` })}`;
}, "/home/santymrk2/Develops/icep-website/src/pages/ministerios.astro", void 0);

const $$file = "/home/santymrk2/Develops/icep-website/src/pages/ministerios.astro";
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
