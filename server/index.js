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

server.get('/loaderio-473f65f530c88214a9524281bdafa623', (req, res) => {
  res.send('loaderio-473f65f530c88214a9524281bdafa623')
})

server.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
