self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v3').then((cache) => {
            return cache.addAll([
                '/index.css',
            ]);
        })
    );
});

self.addEventListener('activate', function (event) {
    const cacheWhitelist = ['v3'];

    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
                return;
            }
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = 'Push Codelab';
    const options = {
        body: 'Yay it works.',
        icon: 'images/icon.png',
        badge: 'images/badge.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
});
