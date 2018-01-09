const CACHE_VERSIONS = '1.0.11';
const PRECACHE_URLS = [
    './',
    'index.html',
    'index.css'
];

self.addEventListener('install', function(event) {
    console.log('Service Worker: Installing....');
    event.waitUntil(
        caches.open(CACHE_VERSIONS).then(function(cache) {
            console.log('Service Worker: Caching App Shell at the moment......');
            return cache.addAll(PRECACHE_URLS);
        }).then(self.skipWaiting())
    );
});

// Fired when the Service Worker starts up
self.addEventListener('activate', function(event) {

    console.log('Service Worker: Activating....');

    event.waitUntil(
        caches.keys().then(cachesName => {
            return cachesName.filter(cacheName => CACHE_VERSIONS !== cacheName);
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                console.log('Service Worker: Removing Old Cache', cacheToDelete);
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});


self.addEventListener('fetch', function(event) {

    console.log('Service Worker: Fetch', event.request.url);

    console.log("Url", event.request.url);

    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then(response => {
                if (response) {
                    return response;
                }
                const fetchRequest = event.request.clone();
                return fetch(fetchRequest).then(
                    function(response) {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        var responseToCache = response.clone();
                        caches.open(CACHE_VERSIONS)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    }
                );
            })
        );
    }
});
