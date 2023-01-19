const staticCacheName = 'static-cache-v1'
const dynamicCacheName = 'dynamic-cache-v0'
const staticAssets = [
    '/',
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
    '/github_mark_white.svg',
    'Comic_CAT.otf',
    'chic.png',
]
self.addEventListener('install', async (e)=>{
    console.log('service Worker установлен', e)
    self.skipWaiting()
    e.waitUntil(
        caches.open(staticCacheName)
          .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(staticAssets);
          })
      )
    //const cache = await caches.open(staticCacheName)
    //await cache.addAll(staticAssets)
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

self.addEventListener("fetch", function (event) {
    console.log(event.request)
    event.respondWith(
        fetch(event.request).catch(function(){
            return caches.match(event.request)
        })
    )
})
