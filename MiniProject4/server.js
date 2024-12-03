// Imports
const express = require( 'express' );
const routes = require( './src/routes' );

const app = express();
app.use( routes );

const PORT = 80;

// Ask server to listen for incoming connections
app.listen( PORT, () => console.log( `Server listening on port: ${PORT}` ) );