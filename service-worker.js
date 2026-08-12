const CACHE_NAME = 'my-darts-scorer-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/dartboard.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => { if (k !== CACHE_NAME) return caches.delete(k); })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  // Serve the app shell for navigation requests (SPA routing / when opening the PWA).
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(resp => {
          // cache the index.html for future navigations
          return caches.open(CACHE_NAME).then(cache => {
            try { cache.put('./index.html', resp.clone()); } catch (e) { }
            return resp;
          });
        }).catch(() => caches.match('./index.html'));
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(resp => {
        return caches.open(CACHE_NAME).then(cache => {
          try { cache.put(event.request, resp.clone()); } catch (e) { }
          return resp;
        });
      }).catch(() => caches.match('./index.html'));
    })
  );
});
