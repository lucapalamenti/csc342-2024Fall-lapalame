// Imports
const express = require( 'express' );
const multer = require( 'multer' );
const path = require( 'path' );
// Create a new server instance
const app = express();
// Destination for uploads to go
const upload = multer({ dest: 'uploads/' });
// Port number can be anything
const PORT = 80;

const validate = require( './validate.js' );

app.use( express.static( 'static' ) );
app.use( express.urlencoded({ extended: true }) );

const templatesPath = path.join(__dirname, 'templates');

// Required because '/' is the default URL which we are setting to 'form.html'
app.get('/', (req, res) => {
    res.sendFile(path.join( templatesPath, 'form.html' ) );
});

app.post( '/submit', (req, res) => {
    console.log( req.body );
    if ( validate.validateRegistration( req.body ) ) {
        res.sendFile( path.join( templatesPath, 'success.html' ) );
    } else {
        res.sendFile( path.join( templatesPath, 'error.html' ) );
    }
});

// Ask server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));