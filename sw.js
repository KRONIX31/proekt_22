const staticCacheName = 'static-cache-v4'
const staticAssets = [
    '.',
    'index.html',
    'icon192.png',
    'icon512.png',
    'style.css',
    'main.js',
    'app.js',
    'manifest.json',
    'burger.svg',
    'close.svg',
    'Meteor.svg',
    'Meteor_mobile.svg',
    'Comic_CAT.otf',
    'github_mark_white.svg',
    'chic.png',
]
self.addEventListener('install', async (e)=>{
    console.log('service Worker установлен', e)
    self.skipWaiting()

    /*e.waitUntil(
        (async() => {
            try {
                cache_obj = await caches.open(staticCacheName)
                cache_obj.addAll(staticAssets)
            }
            catch{
                console.log("error occured while caching...")
            }
        })()
    )*/
    const cache = await caches.open(staticCacheName)
    staticAssets.forEach(async element => {
        await cache.add(element).catch((error)=>{
            console.log(error)
        })
    })
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

function tryNetwork(req, timeout){
    console.log(req)
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(reject, timeout)
        fetch(req).then((res) => {
            clearTimeout(timeoutId)
            const responseClone = res.clone()
            caches.open(staticCacheName).then((cache) => {
                cache.put(req, responseClone)
            })
            resolve(res)
        }, reject)
    })
}

function getFromCache(req){
    console.log('Сеть плоха, работа с кэшем')
    return caches.open(staticCacheName).then((cache) => {
        return cache.match(req).then((result) => {
            return result || Promise.reject("no-match")
        })
    })
}

self.addEventListener('fetch', (e)=>{
    e.respondWith(tryNetwork(e.request, 400).catch(()=> getFromCache(e.request)))
})
