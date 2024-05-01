var DYNAMIC_CACHE = 'v20240501-2000'
var urlsToCache = [
  'AppManager.js',
  'Falador.js',
  'index.css',
  'index.html',
  'index.js',
  'manifest.json',
  'res/icons/128.png',

  'res/bichos/abelha.avif',
  'res/bichos/baleia.avif',
  'res/bichos/cachorro.avif',
  'res/bichos/cavalo.avif',
  'res/bichos/coelho.avif',
  'res/bichos/elefante.avif',
  'res/bichos/galinha.avif',
  'res/bichos/gato.avif',
  'res/bichos/jacaré.avif',
  'res/bichos/leão.avif',
  'res/bichos/macaco.avif',
  'res/bichos/peixe.avif',
  'res/bichos/porco.avif',
  'res/bichos/tartaruga.avif',
  'res/bichos/tigre.avif',
  'res/bichos/tubarão.avif',
  'res/bichos/urso.avif',
  'res/bichos/vaca.avif',
  'res/bichos/zebra.avif',
];
self.addEventListener ('install',  async function (event) {
    self.skipWaiting ();
    event.waitUntil (
        caches.open (DYNAMIC_CACHE)
        .then (function (cache) {
            // console.log ('Opened cache');
            return cache.addAll (urlsToCache);
        })
    );
});

self.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting ();
    }
});

self.addEventListener ('fetch', (event) => {
    event.respondWith ((async () => {
        const cachedResponse = await caches.match (event.request);
        if (cachedResponse) {
            return cachedResponse;
        }

        const response = await fetch (event.request);

        if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
        }

        if (urlsToCache) {
            const responseToCache = response.clone ();
            const cache = await caches.open (DYNAMIC_CACHE)
            await cache.put (event.request, response.clone ());
        }

        return response;
    }) ());
})

self.addEventListener('activate', (event) => {
    event.waitUntil ((async () => {
        const cacheNames = await caches.keys();

        await Promise.all (cacheNames.map (async (cacheName) => {
            if (self.cacheName !== cacheName) {
            await caches.delete (cacheName);
            }
        }));
    }) ());
});
