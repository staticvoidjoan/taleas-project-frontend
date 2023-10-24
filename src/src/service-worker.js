import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

// Cache the HTML shell (index.html) using CacheFirst strategy
registerRoute(
  ({ request }) => request.destination === 'document',
  new CacheFirst({
    cacheName: 'html-shell',
  })
);

// Cache other static assets with StaleWhileRevalidate strategy
registerRoute(
  ({ request }) =>
    request.destination === 'style' || request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'static-assets',
  })
);

// Cache images using CacheFirst strategy and apply expiration
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100, // Adjust max entries as needed
        maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
      }),
    ],
  })
);

// Cache API requests using StaleWhileRevalidate strategy
registerRoute(
  ({ request }) => request.destination === 'fetch',
  new StaleWhileRevalidate({
    cacheName: 'api-data',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50, // Adjust max entries as needed
        maxAgeSeconds: 24 * 60 * 60, // Cache for 24 hours
      }),
    ],
  })
);

// Handle network navigation requests with a CacheFirst strategy
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new CacheFirst({
    cacheName: 'navigation',
  })
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
