const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const router = require('./router.js');
const newrelic = require('newrelic');

const port = 3000;

const server = express();

// Apply Middleware
server.use(morgan('dev'));
server.use(express.json());
server.use(cors());
server.use(bodyparser.json());
server.use(bodyparser.urlencoded({ extended: true }));

server.use('/api', router);

// Loader.io verification for server 1
// server.get('/loaderio-473f65f530c88214a9524281bdafa623', (req, res) => {
//   res.send('loaderio-473f65f530c88214a9524281bdafa623')
// })

// Loader io verification for nginx
server.get('/loaderio-cc9764a3d498a1a24e29aa58731a0625', (req, res) => {
  res.send('loaderio-cc9764a3d498a1a24e29aa58731a0625')
})

server.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
