import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_SQETW4nW.mjs';
import { manifest } from './manifest_BE50G4Xz.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/api/events.astro.mjs');
const _page3 = () => import('./pages/calendario.astro.mjs');
const _page4 = () => import('./pages/contacto.astro.mjs');
const _page5 = () => import('./pages/enconstruccion.astro.mjs');
const _page6 = () => import('./pages/historia.astro.mjs');
const _page7 = () => import('./pages/ministerios/adolescentes.astro.mjs');
const _page8 = () => import('./pages/ministerios/jovenes.astro.mjs');
const _page9 = () => import('./pages/ministerios/matrimonios.astro.mjs');
const _page10 = () => import('./pages/ministerios/mujeres.astro.mjs');
const _page11 = () => import('./pages/ministerios/ninios.astro.mjs');
const _page12 = () => import('./pages/ministerios.astro.mjs');
const _page13 = () => import('./pages/nosotros.astro.mjs');
const _page14 = () => import('./pages/robot.txt.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.11.0_@types+node@24.0.10_jiti@2.4.2_lightningcss@1.30.1_rollup@4.44.1_terser@5.37.0_typescript@5.7.3_yaml@2.8.0/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/api/events.ts", _page2],
    ["src/pages/calendario.astro", _page3],
    ["src/pages/contacto.astro", _page4],
    ["src/pages/enconstruccion.astro", _page5],
    ["src/pages/historia.astro", _page6],
    ["src/pages/ministerios/adolescentes.astro", _page7],
    ["src/pages/ministerios/jovenes.astro", _page8],
    ["src/pages/ministerios/matrimonios.astro", _page9],
    ["src/pages/ministerios/mujeres.astro", _page10],
    ["src/pages/ministerios/ninios.astro", _page11],
    ["src/pages/ministerios.astro", _page12],
    ["src/pages/nosotros.astro", _page13],
    ["src/pages/robot.txt.ts", _page14],
    ["src/pages/index.astro", _page15]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "6a069279-fab8-416a-bb7c-beffd81df138",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
