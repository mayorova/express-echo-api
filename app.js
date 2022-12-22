const express = require('express');
const cors = require('cors');
const logger = require('./lib/logger.js');
const { reqData, inspect } = require('./lib/utils');

const app = express();

const port = process.env.PORT || 3000,
      ip   = process.env.IP   || '0.0.0.0';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors())

// Log the request
app.use(function (req, res, next) {
  logger.info('-----------------------------------');
  logger.info(inspect(reqData(req)));
  logger.info('-----------------------------------\n\n');
  next();
});

// "Catch-all" handler
app.all('*', function (req, res) {
  res.set('Content-Type', 'application/json');
  const response = reqData(req);
  res.status(200).json(response);
});

app.listen(port, ip, function () {
  logger.info('Echo API is listening on port ' + port );
});

module.exports = app;
