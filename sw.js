const staticCacheName = 'static-cache-v3'
const dynamicCacheName = 'dynamic-cache-v0'
const staticAssets = [
    '/index.html',
    '/icon192.png',
    '/icon512.png',
    '/style.css',
    '/main.js',
    '/app.js',
    '/manifest.json',
    '/burger.svg',
    '/close.svg',
    '/Meteor_mobile.svg',
    '/Meteor.svg',
]
self.addEventListener('install', async (e)=>{
    console.log('service Worker установлен', e)
    self.skipWaiting()

    const cache = await caches.open(staticCacheName)
    await cache.addAll(staticAssets)
})
self.addEventListener('activate', async (e)=>{
    console.log('service Worker активирован', e)

    cachesKeys = await caches.keys()
    const checkKeys = cachesKeys.map(async key =>{
        console.log(key)
        if(staticCacheName !== key){
            await caches.delete(key)
        }
    })
    await Promise.all(checkKeys)
})

self.addEventListener('fetch', (e)=>{
    e.respondWith(
        fetch(e.request).catch(function(){
            return caches.match(e.request)
        })
    )
})
