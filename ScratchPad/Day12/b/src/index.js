const path = require('path');
// Import our Express dependency
const express = require('express');
// Create a new server instance
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const multer = require('multer');
const upload = multer({ dest: '../uploads/' });

const templateFolder = path.join(__dirname, '..', 'templates');


app.get('/', (req, res) => {
	res.sendFile(path.join(templateFolder, 'form.html'));
});

// Import validation.js
const validateRegistration = require('./validation');

app.post('/submit', upload.none(), (req, res) => {
	console.log(req.body);
	if ( validateRegistration( req.body ) === false ) {
		res.status(400).sendFile( path.join(templateFolder, 'error.html' ) );
	} else {
		res.sendFile( path.join( templateFolder, 'success.html') );
	}
});

// Port number we want to use on this server
const PORT = 3000;
// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));