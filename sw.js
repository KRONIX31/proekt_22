const staticCacheName = 'static-cache-v0'
const dynamicCacheName = 'dynamic-cache-v0'
const staticAssets = [
    '/index.html',
    '/icon192.png',
    '/icon512.png',
    '/style.css',
    '/main.js',
    '/app.js',
    '/burger.svg',
    '/close.svg'
]
self.addEventListener('install', async (e)=>{
    console.log('service Worker установлен', e)
    
    const cache = await caches.open(staticCacheName)
    await cache.addAll(staticAssets)
})
self.addEventListener('activate', async (e)=>{
    console.log('service Worker активирован', e)

    cachesKeys = await caches.keys()
    const checkKeys = cachesKeys.map(async key =>{
        if(staticCacheName !== key){
            await caches.delete(key)
        }
    })
    await Promise.all(checkKeys)
})

self.addEventListener('fetch', (e)=>{
    e.respondWith(cacheFirst(e.request))
})
async function cacheFirst(request){
    const cached = await caches.match(request)
    if(cached){
        return cached
    } else{
        return await fetch(request)
    }
}