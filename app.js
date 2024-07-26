const express = require('express');
const cors = require('cors');
const logger = require('./lib/logger.js');
const { reqData, inspect } = require('./lib/utils');

const resp = require('./resp.json');

const app = express();

const port = process.env.PORT || 3000,
      ip   = process.env.IP   || '0.0.0.0';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Log the request
app.use(function (req, res, next) {
  logger.info('-----------------------------------');
  logger.info(inspect(reqData(req)));
  logger.info('-----------------------------------\n\n');
  next();
});

app.get('/test', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.status(200).json(resp);
});

app.get('/csv1', function (req, res) {
  res.set('Content-Type', 'text/csv');
  const str = '"TEST","TEST"\n"hoge","hoge"'
  res.status(200).send(str);
});

app.get('/csv2', function (req, res) {
  res.set('Content-Type', 'text/csv');
  const str = 'TEST,"TEST"\n"hoge","hoge"'
  res.status(200).send(str);
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
