const express = require('express');
const winston = require('winston');
const util = require('util');
const cors = require('cors');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    // winston.format.simple()
    winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console()
  ]
});

const app = express();

const port = process.env.PORT || 3000,
      ip   = process.env.IP   || '0.0.0.0';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.listen(port, ip, function () {
  logger.info('Echo API is listening on port ' + port );
});

const reqData = function(req) {
  const params = ['method', 'hostname', 'path', 'query', 'headers', 'body'];
  return params.reduce(
    (accumulator, currentValue) => { accumulator[currentValue] = req[currentValue]; return accumulator},
    {}
  );
};

app.all('*', function (req, res) {
  logger.info(util.inspect(reqData(req), false, null, true));
  res.set('Content-Type', 'application/json');
  const response = reqData(req);
  res.status(200).send(JSON.stringify(response,null,2));
});

module.exports = app;
