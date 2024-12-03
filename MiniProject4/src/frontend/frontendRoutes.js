const express = require( 'express' );
const frontendRouter = express.Router();

// Set the folder 'static' to serve static resources
frontendRouter.use( express.static( 'static' ) );

const path = require( 'path' );
const templatesPath = path.join( __dirname, '../../templates' );

// Default page request sends us to login.html
frontendRouter.get( '/', (req, res) => {
    res.sendFile( path.join( templatesPath, 'home.html' ) );
});
frontendRouter.get( '/login', (req, res) => {
    res.sendFile( path.join( templatesPath, 'login.html' ) );
});
frontendRouter.get( '/home', (req, res) => {
    res.sendFile( path.join( templatesPath, 'home.html' ) );
});
frontendRouter.get( '/profile', (req, res) => {
    res.sendFile( path.join( templatesPath, 'profile.html' ) );
});
frontendRouter.get( '/error', (req, res) => {
    res.sendFile( path.join( templatesPath, 'error.html' ) );
});

module.exports = frontendRouter;