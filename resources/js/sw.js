self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v7').then(cache => {
      return cache.addAll([
        '/budget',
        '/js/budget-app.js',
        '/css/budget-app.css',
        '/storage/images/budget/budget-192.png'
      ])
    })
  )
})

self.addEventListener('fetch', event => {
  // request method 'post' not supported, so let's not cache it
  if (event.request.method !== 'GET') return event.respondWith(fetch(event.request))
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request).then(response => {
        let responseClone = response.clone()
        caches.open('v7').then(cache => {
          cache.put(event.request, responseClone)
        })

        return response
      }) // this .then .catches below, I think?
    }).catch(err => {
      return Response("Fetch error: ", err)
    })
  )
})

self.addEventListener('activate', event => {
  var cacheKeeplist = ['v7']

  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (cacheKeeplist.indexOf(key) === -1) return caches.delete(key)
      }))
    })
  )
})

self.addEventListener('message', event => {
  console.log("sw got message: ", event.data)
  // if (event.data == 'test') postMessage('got message: '+event.data)
})

self.addEventListener('error', error => postMessage(error))