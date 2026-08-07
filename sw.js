/* Deus e Sentido — service worker (offline + app) */
const CACHE = 'deus-e-sentido-v8';
const ASSETS = [
  './',
  './index.html',
  './assets/dias.js',
  './assets/estudos.js',
  './manifest.webmanifest',
  './og-image.png',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate: responde do cache na hora e atualiza em segundo plano.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(req);
      const network = fetch(req).then(res => {
        if (res && res.status === 200 && res.type === 'basic') cache.put(req, res.clone());
        return res;
      }).catch(() => null);
      const response = cached || (await network);
      if (response) return response;
      if (req.mode === 'navigate') return cache.match('./index.html');
      return Response.error();
    })
  );
});
