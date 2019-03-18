const http = require('http');
const path = require('path');
const config = require('config');
const express = require('express');

app = express();
server = http.createServer(app);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// launch server
server.listen(config.server.port, config.server.host, () => {
  address = server.address();
  console.log(`Server listening at http://${address.address}:${address.port}`);
});
