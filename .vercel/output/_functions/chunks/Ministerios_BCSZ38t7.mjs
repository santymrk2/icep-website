import { c as createComponent, r as renderTemplate, a as addAttribute, b as renderHead, d as renderComponent, e as createTransitionScope, f as renderTransition, g as renderSlot, h as createAstro } from './astro/server_DujD4fpc.mjs';
/* empty css                                           */
import { $ as $$Header, a as $$Footer } from './Footer_BCFc9V33.mjs';
/* empty css                                */

const $$Astro = createAstro();
const $$Ministerios = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Ministerios;
  const {
    title,
    description = "Iglesia Cristiana Evang\xE9lica en Pilar - Sitio Oficial"
  } = Astro2.props;
  let titleAux = title;
  let backSite = "";
  let nextSite = "";
  if (titleAux == "ICEP | Ni\xF1os") {
    console.log(titleAux);
    backSite = "matrimonios";
    nextSite = "adolescentes";
  } else if (titleAux == "ICEP | Adolescentes") {
    console.log(titleAux);
    backSite = "ninios";
    nextSite = "jovenes";
  } else if (titleAux == "ICEP | Pontifex") {
    console.log(titleAux);
    backSite = "adolescentes";
    nextSite = "mujeres";
  } else if (titleAux == "ICEP | Mujeres") {
    console.log(titleAux);
    backSite = "adolescentes";
    nextSite = "matrimonios";
  } else if (titleAux == "ICEP | Matrimonios") {
    console.log(titleAux);
    backSite = "adolescentes";
    nextSite = "ninios";
  } else {
    backSite = "jovenes";
    nextSite = "contacto";
  }
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/LogoWhite.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="min-h-screen font-sans bg-white"> ${renderComponent($$result, "Header", $$Header, { "data-astro-transition-persist": createTransitionScope($$result, "kx5cajk3") })} <main class="flex flex-col shadow-lg rounded-xl bg-white m-5 sm:m-10"${addAttribute(renderTransition($$result, "v3p4o3lr"), "data-astro-transition-scope")}> <div class="flex justify-between items-center w-full p-6"> <div class="flex justify-center items-center w-10 h-10 bg-white ring ring-2 ring-custom-blue rounded-full group hover:ring-0 hover:bg-custom-blue transition-all easy-in-out"> <a${addAttribute(`/${backSite}`, "href")}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="1 1 24 24" fill="white" class="size-6 w-10 fill-custom-blue group-hover:fill-white transition-all easy-in-out"> <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd"></path> </svg> </a> </div> <div class="flex flex-row justify-center items-center"> ${renderSlot($$result, $$slots["title"])} </div> <div class="flex justify-center items-center w-10 h-10 bg-white ring ring-2 ring-custom-blue rounded-full group hover:ring-0 hover:bg-custom-blue transition-all easy-in-out"> <a${addAttribute(`/${nextSite}`, "href")}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 0 24 24" fill="white" class="size-6 w-10 fill-custom-blue group-hover:fill-white transition-all easy-in-out"> <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd"></path> </svg> </a> </div> </div> ${renderSlot($$result, $$slots["content"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/home/santymrk2/Develops/icep-website/src/layouts/Ministerios.astro", "self");

export { $$Ministerios as $ };
