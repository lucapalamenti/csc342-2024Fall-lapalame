// Import our Express dependency
const express = require('express');
const path = require('path');
// Create a new server instance
const app = express();
// Port number we want to use on this server
const PORT = 3000;

// Add your code here
app.use(express.static('static'));
const templatesPath = path.join(__dirname, 'templates');
app.get('/', (req, res) => {
    res.sendFile(path.join(templatesPath, 'index.html'));
});
app.get('/company/about', (req, res) => {
    res.sendFile(path.join(templatesPath, 'about.html'));
});
// As our server to listen for incoming connections
app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(templatesPath, '404.html'));
});
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));