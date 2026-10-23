import { clientsClaim, skipWaiting } from 'workbox-core';
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

declare let self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<{ url: string; revision?: string | null }>;
};

skipWaiting();
clientsClaim();
cleanupOutdatedCaches();

const manifest = self.__WB_MANIFEST;
precacheAndRoute(manifest);

const scopePath = new URL(self.registration.scope).pathname;
const basePath = scopePath.endsWith('/') ? scopePath : `${scopePath}/`;
const productionBuild = manifest.some((entry) =>
  (typeof entry === 'string' ? entry : entry.url).endsWith('index.html'),
);

if (productionBuild) {
  const navigationHandler = createHandlerBoundToURL(`${basePath}index.html`);
  registerRoute(new NavigationRoute(navigationHandler));
} else {
  // VitePWA does not inject a precache manifest in development. Use a
  // network-first runtime cache so 5173 can exercise the same offline paths.
  const devCacheName = `qilian-dev-runtime-${self.registration.scope}`;
  const devAssets = [
    basePath,
    `${basePath}index.html`,
    `${basePath}engines/eleeye/worker.js`,
    `${basePath}engines/eleeye/eleeye.js`,
    `${basePath}engines/eleeye/eleeye.wasm`,
  ];

  self.addEventListener('install', (event) => {
    event.waitUntil(
      (async () => {
        const cache = await caches.open(devCacheName);
        await Promise.allSettled(
          devAssets.map(async (url) => {
            const response = await fetch(url);
            if (response.ok) await cache.put(url, response);
          }),
        );
      })(),
    );
  });

  self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);
    if (request.method !== 'GET' || url.origin !== self.location.origin) return;

    event.respondWith(
      (async () => {
        const cache = await caches.open(devCacheName);
        try {
          const response = await fetch(request);
          if (response.ok) await cache.put(request, response.clone());
          return response;
        } catch {
          const cached = await cache.match(request, { ignoreSearch: true });
          if (cached) return cached;
          if (request.mode === 'navigate') {
            const shell = await cache.match(basePath, { ignoreSearch: true });
            if (shell) return shell;
          }
          throw new Error('offline resource unavailable');
        }
      })(),
    );
  });
}

// 引擎已改为服务端计算；顺手清掉旧版本遗留的引擎缓存。
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.filter((name) => name.startsWith('qilian-engine-')).map((name) => caches.delete(name)),
      );
    })(),
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
