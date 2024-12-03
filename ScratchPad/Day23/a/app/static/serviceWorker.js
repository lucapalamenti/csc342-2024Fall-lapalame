const version = 2;
const STATIC_CACHE_NAME = `ncparks-static-v${version}`

function log(...data) {
  console.log(`SWv${version}.0`, ...data);
}

log("SW Script executing - adding event listeners");

self.addEventListener('install', event => {
  log('install', event);

  event.waitUntil(
    caches.open( STATIC_CACHE_NAME ).then( cache => {
      return cache.addAll([
        '/offline',
        '/css/base.css',
        '/css/offline.css',
        '/js/common.js',
        'https://unpkg.com/leaflet@1.9.1/dist/leaflet.css',
        'https://unpkg.com/leaflet@1.9.1/dist/leaflet.js',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
      ]);
    })
  );
  // As soon as this method returns, the service worker is considered installed
});

self.addEventListener('activate', event => {
  log('activate', event);

  event.waitUntil(
    // Get a list of all the cache names
    caches.keys().then( cacheNames => {
      return Promise.all(
        cacheNames.filter( name => {
          return name.startsWith( 'ncparks-' ) && name != STATIC_CACHE_NAME;
        }).map( name => {
          return caches.delete( name );
        })
      );
    })
  );
  // As soon as this method returns, the service worker is considered active
});

function fetchAndCache( request ) {
  return fetch( request ).then( response => {
    if ( response.ok && request.method == 'GET' ) {
      caches.open( STATIC_CACHE_NAME ).put( request, response );
    }
    return response.clone();
  });
}

function cacheFirst( request ) {
  return caches.match( request ).then( response => {
    if ( response ) {
      return response;
    } else {
      return fetchAndCache( request );
    }
  }).catch( err => {
    return caches.match( '/offline' );
  });
}

function networkFirst( request ) {
  return fetchAndCache( request ).then( response => {

  }).catch( err => {
    return caches.match( '/offline' );
  });
}

self.addEventListener('fetch', event => {
  event.respondWith(
    cacheFirst( event.request )
  );
});



self.addEventListener('message', event => {
  log('message', event.data);
  if(event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
