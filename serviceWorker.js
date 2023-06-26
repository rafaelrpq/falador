var DYNAMIC_CACHE = '20230626-1857'
var urlsToCache = [
  './index.html',
  './index.css',
  './snackbar.css',
  './index.js',
  './AppManager.js',
  './Falador.js',
  './manifest.json',
  './res/icons/128.png',

  './res/bichos/',
];
self.addEventListener ('install',  async function (event) {
    // self.skipWaiting ();
    // event.waitUntil (
    //     caches.open (DYNAMIC_CACHE)
    //     .then (function (cache) {
    //         // console.log ('Opened cache');
    //         return cache.addAll (urlsToCache);
    //     })
    // );
    try {
      // ok = await cache.addAll(urlsToCache);
      event.waitUntil (
          caches.open (DYNAMIC_CACHE)
          .then (function (cache) {
              // console.log ('Opened cache');
              return cache.addAll (urlsToCache);
          })
      );
    } catch (err) {
      console.error('sw: cache.addAll');
      for (let i of urlsToCache) {
        try {
          caches.open (DYNAMIC_CACHE)
          .then (function (cache) {
              // console.log ('Opened cache');
              return cache.add(i);
          })
        } catch (err) {
          console.warn('sw: cache.add',i);
        }
      }
    }
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
