import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CGUzIA-v.mjs';
import { manifest } from './manifest_DsIuFUv8.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/rss-feed.astro.mjs');
const _page4 = () => import('./pages/benefits.astro.mjs');
const _page5 = () => import('./pages/iod.astro.mjs');
const _page6 = () => import('./pages/recruitment-incentives.astro.mjs');
const _page7 = () => import('./pages/resources.astro.mjs');
const _page8 = () => import('./pages/vacancies.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/rss-feed.js", _page3],
    ["src/pages/benefits.astro", _page4],
    ["src/pages/iod.astro", _page5],
    ["src/pages/recruitment-incentives.astro", _page6],
    ["src/pages/resources.astro", _page7],
    ["src/pages/vacancies.astro", _page8],
    ["src/pages/index.astro", _page9]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///workspaces/join-our-team/dist/client/",
    "server": "file:///workspaces/join-our-team/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
