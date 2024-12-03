const path = require('path');
// Import our Express dependency
const express = require('express');
// Import HowlDAO
const HowlDAO = require('./db/HowlDAO');
// Create a new server instance
const app = express();

app.use(express.static('public'));

const templateFolder = path.join(__dirname, '..', 'templates');

app.get('/', (req, res) => {
	res.sendFile(path.join(templateFolder, 'index.html'));
});

app.get('/howls', (req, res) => {
	HowlDAO.getHowls()
		.then( howls => {
			res.json(howls);
		});
});

app.post('/howls', (req, res) => {
	console.log( req.body );
	HowlDAO.createHowl( req.body )
		.then( howl => {
			res.json( howl );
		});
});

// Port number we want to use on this server
const PORT = 3000;
// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));