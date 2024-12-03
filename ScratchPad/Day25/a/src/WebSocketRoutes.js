const express = require('express');
const WebSocketRouter = express.Router();

const messages = [];
const clients = new Set();

function sendPacket( ws, label, data ) {
    let packet = {
        label: label,
        data: data
    }
    ws.send( JSON.stringify( packet ) );
}

WebSocketRouter.ws('/ws', (ws, req) => {
    console.log('New client');
    clients.add( ws );

    ws.on( 'close', e => {
        clients.delete( ws );
    });

    ws.on( 'message', msg => {
        const packet = JSON.parse( msg );
        switch ( packet.label ) {
            case "chat":
                messages.push( packet.data );
                clients.forEach( client => {
                    if ( client != ws ) {
                        client.send( msg );
                    }
                    
                });
                break;
        }
    });
});

module.exports = WebSocketRouter;