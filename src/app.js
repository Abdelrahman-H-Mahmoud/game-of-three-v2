const express = require('express');
const http = require("http");
const app = express();
const { PORT } = require('../config');

app.use(express.static('public'));

app.get('/', (req, res) => {
  return res.sendFile(`${__dirname}/views/index.html`);
})

function startServer() {
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log('Game Backend Server Started');
  });
  return server;
}

module.exports = startServer;