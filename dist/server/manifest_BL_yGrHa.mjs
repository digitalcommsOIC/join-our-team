import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Bb9te5Rb.mjs';
import 'es-module-lexer';
import { i as decodeKey } from './chunks/astro/server_qh0CtZy9.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///workspaces/join-our-team/","adapterName":"@astrojs/node","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"benefits/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/benefits","isIndex":false,"type":"page","pattern":"^\\/benefits\\/?$","segments":[[{"content":"benefits","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/benefits.astro","pathname":"/benefits","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"headofeducation/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/headofeducation","isIndex":false,"type":"page","pattern":"^\\/headofeducation\\/?$","segments":[[{"content":"headofeducation","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/headofeducation.astro","pathname":"/headofeducation","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"iod/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/iod","isIndex":false,"type":"page","pattern":"^\\/iod\\/?$","segments":[[{"content":"iod","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/iod.astro","pathname":"/iod","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"recruitment-incentives/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/recruitment-incentives","isIndex":false,"type":"page","pattern":"^\\/recruitment-incentives\\/?$","segments":[[{"content":"recruitment-incentives","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/recruitment-incentives.astro","pathname":"/recruitment-incentives","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"resources/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/resources","isIndex":false,"type":"page","pattern":"^\\/resources\\/?$","segments":[[{"content":"resources","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/resources.astro","pathname":"/resources","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"vacancies/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/vacancies","isIndex":false,"type":"page","pattern":"^\\/vacancies\\/?$","segments":[[{"content":"vacancies","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/vacancies.astro","pathname":"/vacancies","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/rss-feed","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/rss-feed\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"rss-feed","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/rss-feed.js","pathname":"/api/rss-feed","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https:joinus.orkneyislands.uk","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/workspaces/join-our-team/src/components/NavBlack.astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/join-our-team/src/pages/recruitment-incentives.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/recruitment-incentives@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/workspaces/join-our-team/src/components/HeroJob.astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/join-our-team/src/pages/headofeducation.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/headofeducation@_@astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/join-our-team/src/pages/iod.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/iod@_@astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/join-our-team/src/components/Hero.astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/join-our-team/src/pages/about.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/about@_@astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/join-our-team/src/pages/benefits.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/benefits@_@astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/join-our-team/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/join-our-team/src/pages/resources.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/resources@_@astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/join-our-team/src/pages/vacancies.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/vacancies@_@astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/join-our-team/src/pages/404.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/rss-feed@_@js":"pages/api/rss-feed.astro.mjs","\u0000@astro-page:src/pages/benefits@_@astro":"pages/benefits.astro.mjs","\u0000@astro-page:src/pages/headofeducation@_@astro":"pages/headofeducation.astro.mjs","\u0000@astro-page:src/pages/iod@_@astro":"pages/iod.astro.mjs","\u0000@astro-page:src/pages/recruitment-incentives@_@astro":"pages/recruitment-incentives.astro.mjs","\u0000@astro-page:src/pages/resources@_@astro":"pages/resources.astro.mjs","\u0000@astro-page:src/pages/vacancies@_@astro":"pages/vacancies.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","/workspaces/join-our-team/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_BL_yGrHa.mjs","/workspaces/join-our-team/src/components/SchoolCards.svelte":"_astro/SchoolCards.Ur_VakbG.js","/workspaces/join-our-team/src/components/DirectorateCards.svelte":"_astro/DirectorateCards.B-NXDYKU.js","/workspaces/join-our-team/src/components/ValuesCards.svelte":"_astro/ValuesCards.BazuPmw_.js","/workspaces/join-our-team/src/components/AllPosts.svelte":"_astro/AllPosts.uirJaAbt.js","/workspaces/join-our-team/src/components/surprise.svelte":"_astro/surprise.D5R9ykgK.js","@astrojs/svelte/client.js":"_astro/client.CWY0IrnN.js","/astro/hoisted.js?q=0":"_astro/hoisted.BB6uRyKX.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/about.B_X6tyul.css","/favicon-about.svg","/favicon-benefits.svg","/favicon-hoe.svg","/favicon-resources.svg","/favicon.svg","/oic_logo_landscape_black.webp","/oic_logo_landscape_white.webp","/robots.txt","/_astro/AllPosts.uirJaAbt.js","/_astro/DirectorateCards.B-NXDYKU.js","/_astro/SchoolCards.Ur_VakbG.js","/_astro/ValuesCards.BazuPmw_.js","/_astro/client.CWY0IrnN.js","/_astro/each.-gASlQSi.js","/_astro/headofeducation.7RS7IePY.css","/_astro/hoisted.BB6uRyKX.js","/_astro/index.BgqqX5iZ.css","/_astro/index.DgfgShYe.js","/_astro/iod.Bj_NYe7s.css","/_astro/surprise.D5R9ykgK.js","/files/Golden Hello - Pilot Scheme TCs.pdf","/files/How to Develop Effective Interview Skills.pdf","/files/Refer a Friend - Pilot Scheme TCs.pdf","/fonts/orkney.woff","/images/1b9a4417.webp","/images/AdobeStock_259003836.webp","/images/Aerial-view-over-Churchill-Barriers-Orkney-Orkneycom.webp","/images/austin-schmid-PFy-3PaHT_M-unsplash.webp","/images/burnmouthBothyCopyrightOrkneyCom.jpg","/images/hr.svg","/images/infrastructure.svg","/images/it.svg","/images/kirkwallWaterfrontCopyrightOrkneyCom.jpg","/images/orkneyfromabove_copy.webp","/images/planning.svg","/images/silas-baisch-ceITO2rlDgc-unsplash.webp","/404.html","/about/index.html","/benefits/index.html","/headofeducation/index.html","/iod/index.html","/recruitment-incentives/index.html","/resources/index.html","/vacancies/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"J1x8HBgAm1KO5r3VEqCT2DqUxdNOleEYgkrcsYHbuqY=","experimentalEnvGetSecretEnabled":false});

export { manifest };
