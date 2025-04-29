import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_C12Q_pbO.mjs';
import { manifest } from './manifest_dWstnPyr.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/adolescentes.astro.mjs');
const _page3 = () => import('./pages/api/events.astro.mjs');
const _page4 = () => import('./pages/contacto.astro.mjs');
const _page5 = () => import('./pages/historia.astro.mjs');
const _page6 = () => import('./pages/jovenes.astro.mjs');
const _page7 = () => import('./pages/matrimonios.astro.mjs');
const _page8 = () => import('./pages/ministerios.astro.mjs');
const _page9 = () => import('./pages/mujeres.astro.mjs');
const _page10 = () => import('./pages/ninios.astro.mjs');
const _page11 = () => import('./pages/nosotros.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.3.1_@types+node@22.13.5_jiti@2.4.2_lightningcss@1.29.1_rollup@4.34.8_terser@5.37.0_typescript@5.7.3_yaml@2.7.0/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/adolescentes.astro", _page2],
    ["src/pages/api/events.ts", _page3],
    ["src/pages/contacto.astro", _page4],
    ["src/pages/historia.astro", _page5],
    ["src/pages/jovenes.astro", _page6],
    ["src/pages/matrimonios.astro", _page7],
    ["src/pages/ministerios.astro", _page8],
    ["src/pages/mujeres.astro", _page9],
    ["src/pages/ninios.astro", _page10],
    ["src/pages/nosotros.astro", _page11],
    ["src/pages/index.astro", _page12]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "84caef19-e9e7-4b70-a06a-bba2a6652d40",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
