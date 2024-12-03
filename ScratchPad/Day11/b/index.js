// Import our Express dependency
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');
// Create a new server instance
const app = express();
// Port number we want to use on this server
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const templatesPath = path.join(__dirname, 'templates');
app.get('/', (req, res) => {
    res.sendFile(path.join(templatesPath, 'form.html'));
});

// GET form
app.get('/submit/get', (req, res) => {
    res.sendFile(templatesPath + '/received.html');
    console.log(req.query);
});

// POST url form
app.post('/submit/post/url', (req, res) => {
    res.sendFile(templatesPath + '/received.html');
    console.log(req.body);
});

// POST multipart form
app.post('/submit/post/url', upload.none(), (req, res) => {
    res.sendFile(templatesPath + '/received.html');
    console.log(req.body);
});

// POST single file form
app.post('/submit/post/file', upload.single('myfile'), (req, res) => {
    res.sendFile(templatesPath + '/received.html');
    console.log(req.body);
    console.log(req.file);
});

// POST multiple files form
app.post('/submit/post/files', upload.fields([{name: 'myfile1'},{name: 'myfile2'}]), (req, res) => {
    console.log(req.body);
    console.log(req.files);
    res.sendFile(templatesPath, '/received.html');
});

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));