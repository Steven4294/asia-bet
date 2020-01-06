// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
// const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'src')));

app.get('/raw', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/raw.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

const link1 = 'L8bPjlwGrbCaPiUPTe7w_ObmnvYcqFIJ994b4pVmEtg'
const link2 = 'yOerZRmLdv6tZ7ychHyvVEMRx3XT9h7F3m8LN8BoIy8'
app.get(`/.well-known/acme-challenge/${link1}`, (req, res) => {
  res.sendFile(path.join(__dirname, `src/.well-known/acme-challenge/${link1}`));
});
app.get(`/.well-known/acme-challenge/${link2}`, (req, res) => {
  res.sendFile(path.join(__dirname, `src/.well-known/acme-challenge/${link2}`));
});

const port = process.env.PORT || '1339';
app.set('port', port);


const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
