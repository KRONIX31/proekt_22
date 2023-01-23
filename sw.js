const staticCacheName = 'static-cache-v2'
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
    'Comic_CAT.otf'
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
    staticAssets.forEach(element => {
        cache.add(element).catch((error)=>{
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

self.addEventListener('fetch', (e)=>{
    /*e.respondWith(
        fetch(e.request).catch(function(){
            return caches.match(e.request)
        })
    )*/
    e.respondWith((async ()=>{
        const response = await fetch(e.request).catch(error => {
            console.warn(error)
        })
        if(response){
            console.log('Internet', response)
            return response
        } else{
            caches.open(staticCacheName).then(cache => {
                cache.match(e.request).then(cachedFile => {
                    console.log('Файл найден в кэше', cachedFile)
                    return cachedFile
                }).catch(error => {
                    console.warn('Файл в кэше не найден', error)
                })
            })
        }
    })())
})
