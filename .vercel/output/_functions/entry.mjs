import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DpJtMjL0.mjs';
import { manifest } from './manifest_CQDt2ZVY.mjs';

const serverIslandMap = new Map([
]);;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/actividades-cronologico.astro.mjs');
const _page3 = () => import('./pages/adolescentes.astro.mjs');
const _page4 = () => import('./pages/contacto.astro.mjs');
const _page5 = () => import('./pages/creencias.astro.mjs');
const _page6 = () => import('./pages/historia.astro.mjs');
const _page7 = () => import('./pages/instituto.astro.mjs');
const _page8 = () => import('./pages/jovenes.astro.mjs');
const _page9 = () => import('./pages/matrimonios.astro.mjs');
const _page10 = () => import('./pages/ministerioslista.astro.mjs');
const _page11 = () => import('./pages/mujeres.astro.mjs');
const _page12 = () => import('./pages/ninios.astro.mjs');
const _page13 = () => import('./pages/prologo.astro.mjs');
const _page14 = () => import('./pages/responsables.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.1.2_@types+node@22.10.6_jiti@1.21.7_rollup@4.29.1_terser@5.37.0_typescript@5.7.3_yaml@2.7.0/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/actividades-cronologico.astro", _page2],
    ["src/pages/adolescentes.astro", _page3],
    ["src/pages/contacto.astro", _page4],
    ["src/pages/creencias.astro", _page5],
    ["src/pages/historia.astro", _page6],
    ["src/pages/instituto.astro", _page7],
    ["src/pages/jovenes.astro", _page8],
    ["src/pages/matrimonios.astro", _page9],
    ["src/pages/ministeriosLista.astro", _page10],
    ["src/pages/mujeres.astro", _page11],
    ["src/pages/ninios.astro", _page12],
    ["src/pages/prologo.astro", _page13],
    ["src/pages/responsables.astro", _page14],
    ["src/pages/index.astro", _page15]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "301d498f-28b1-4d5d-a9fe-0a2bec61fed6",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
