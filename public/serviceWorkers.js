var CACHE_NAME = 'anaks-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function (event) {
    // Perform install steps
    console.log("service worker started");
    event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          })
      );
});
self.addEventListener("push", function (event) {
    console.log("push");
    console.log("push event:", event);
    const title = event.data.text;
    event.waitUntil(
        self.registration.showNotification(title)
    );
});