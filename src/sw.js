const cacheName = 'worktime1-1-0';
const filesToCache = [
  './',
  './index.html',
  './manifest.json',
  './style.css',
  './app.js',
  './assets/moment.min.js',
  './assets/vue.min.js',
  './assets/favicon.ico',
  './assets/notifications-on.svg',
  './assets/theme.svg'
  './assets/theme-white.svg'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
      })
      .then(function () {
        console.log('[serviceWorker]: Intalled And Skip Waiting on Install');
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
      .then(function () {
      //console.log('[serviceWorker]: Clients Claims');
        return self.clients.claim();
    })
  ); 
});

self.addEventListener('fetch', function(e) {
  //console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
