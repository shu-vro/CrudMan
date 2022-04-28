let CACHE_NAME = "VERSION_1";
let files = ["/index.html", "/offline.html"];

let self = this;

// install service worker
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(files);
        })
    );
});

// fetch event handler for service worker
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return (
                response ||
                fetch(event.request).catch(() => caches.match("/offline.html"))
            );
        })
    );
});

// activate event handler for service worker
self.addEventListener("activate", function (event) {
    const cache_white_list = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(function (cache_names) {
            return Promise.all(
                // eslint-disable-next-line array-callback-return
                cache_names.map((cache_name) => {
                    if (cache_white_list.indexOf(cache_name) === -1) {
                        return caches.delete(cache_name);
                    }
                })
            );
        })
    );
});
