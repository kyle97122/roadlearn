// RoadLearn Service Worker — Cache stratégie : réseau d'abord, cache en secours
const CACHE = 'roadlearn-v4';
const CORE  = ['./index.html', './manifest.json', './icon.svg'];

// Installation : met en cache les fichiers essentiels
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(CORE))
  );
  self.skipWaiting();
});

// Activation : supprime les anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  return self.clients.claim();
});

// Notification click → focus ou ouvre l'app
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cls => {
      const cl = cls.find(c => c.url.includes(self.location.origin));
      if (cl) return cl.focus();
      return clients.openWindow('./');
    })
  );
});

// Fetch : réseau d'abord + mise en cache auto des ressources CDN
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const isLocal = event.request.url.startsWith(self.location.origin);

  if (isLocal) {
    // Ressources locales : réseau d'abord, cache en secours
    event.respondWith(
      fetch(event.request)
        .then(resp => {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(event.request, clone));
          return resp;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // CDN (React, Babel, Tailwind) : cache d'abord, réseau en secours
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(resp => {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(event.request, clone));
          return resp;
        });
      })
    );
  }
});
