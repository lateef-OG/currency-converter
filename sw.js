self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('currencyConverter').then(function(cache) {
        return cache.addAll([
          './',
          './index.html',
          'css/style.css',
          'js/app.js',
          'js/idb.js',
          'img/favicon.png',
          'img/back-img.png',
          'img/convert.png',
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css',
          'https://free.currencyconverterapi.com/api/v5/currencies'
        ]);
      })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
    
});