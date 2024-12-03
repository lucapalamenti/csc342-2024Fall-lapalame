function log( ...data ) {
    console.log( "SWv6.0", ...data );
}

log("SW Script executing - adding event listeners");

self.addEventListener( 'install', e => {
    log( 'install', e );
});

self.addEventListener( 'activate', e => {
    log( 'activate', e );
});

self.addEventListener( 'message', e => {
    log( 'message', e.data );
    // If the message contains {action: 'skipWaiting'}
    if( e.data.action === 'skipWaiting' ) {
        self.skipWaiting();
    }
});

self.addEventListener( 'fetch', e => {
    log( 'fetch', e );
    self.clients.get( e.clientId ).then( client => {
        if ( client ) {
            client.postMessage({url: e.request.url});
        }
    });
});