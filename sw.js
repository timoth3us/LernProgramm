
self.addEventListener('install', event => event.waitUntil(
    caches.open('pwa1').then(cache => {
        return cache.addAll(["./", "./index.html", "./css/style.css", "./img/innovation.png","./img/icon.svg",
            "./commons/contact.html","./commons/tasks.html", "./js/ajax.js", "./js/lernprogramm.js", "./manifest.json"])}
    )));

self.addEventListener('fetch', event => event.respondWith(
    caches.open('pwa1')
        .then(cache => cache.match(event.request))
        .then(response => response || fetch(event.request))
));