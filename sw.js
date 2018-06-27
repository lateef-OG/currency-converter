self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('currencyConverter').then(function(cache) {
        return cache.addAll([
          '/currency-converter/',
          '/currency-converter/index.html',
          '/currency-converter/css/style.css',
          '/currency-converter/js/app.js',
          'https://free.currencyconverterapi.com/api/v5/currencies'
        ]);
      })
    );
});

self.addEventListener('fetch', function(event) {

    console.log(event.request.url);
    event.respondWith(
    
        caches.match(event.request).then(function(response) {
        
            return response || fetch(event.request);
        
        })
        
    );
    
});