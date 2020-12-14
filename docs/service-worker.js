let cacheName = "vuedoer_v1";
self.addEventListener('install', event => {
    event.waitUntil(
        self.skipWaiting()
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) return response;
            
            var requestToCache = event.request.clone();
            return fetch(requestToCache)
            .then(response => {
                if (!response || response.status !== 200) return response;

                 //Cache response
                var responseToCache = response.clone();
                caches.open(cacheName)
                .then(cache => {
                    cache.put(requestToCache, responseToCache)
                });

                return response;
            })
        })
    )
})