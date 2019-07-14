const cacheName = 'v1';


self.addEventListener('install', (e) =>{

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
    e.respondWith(
    fetch(e.request)
    .then(res =>{
        const resClone = res.clone();
        caches
        .open(cacheName)
        .then(cache => {
            console.log(e.request)
            cache.put(e.request,resClone)
        })
        return res;
    }).catch((err) => caches.match(e.request).then(res => res)))
})