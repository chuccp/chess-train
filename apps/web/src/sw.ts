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

precacheAndRoute(self.__WB_MANIFEST);

const scopePath = new URL(self.registration.scope).pathname;
const basePath = scopePath.endsWith('/') ? scopePath : `${scopePath}/`;
const navigationHandler = createHandlerBoundToURL(`${basePath}index.html`);
registerRoute(new NavigationRoute(navigationHandler));

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
