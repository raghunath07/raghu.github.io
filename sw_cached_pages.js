const cacheName = 'v2';
const cacheAssets = [
    'index.html',
    'index.css',
    '/js/main.js'
];

self.addEventListener('install', (e) =>{
  e.waitUntil(
      caches
      .open(cacheName)
      .then(cache => {
          console.log('sw: caching files')
          cache.addAll(cacheAssets)
      })
      .then(() => self.skipWaiting())
  )
});

self.addEventListener('activate', (e) =>{
    console.log('Service Worker: Activated');
    e.waitUntil(
        caches.keys().then(cacheName => {
            return Promise.all(
                cacheName.map(cache => {
                    if(cache !== cacheName){
                        console.log('Service Worker : Clearing old Cache')
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

self.addEventListener('fetch', e => {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
})