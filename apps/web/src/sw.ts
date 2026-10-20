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
const enginePath = `${basePath}engines/`;
const navigationHandler = createHandlerBoundToURL(`${basePath}index.html`);
registerRoute(
  new NavigationRoute(navigationHandler, {
    denylist: [/[/]engines[/]/, /[/]engine[/]/],
  }),
);

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (!url.pathname.startsWith(enginePath)) return;

  event.respondWith(
    (async () => {
      const cacheNames = (await caches.keys()).filter((name) => name.startsWith('qilian-engine-'));
      for (const cacheName of cacheNames) {
        const cached = await caches.match(event.request, { cacheName });
        if (cached) return cached;
      }
      return fetch(event.request);
    })(),
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
