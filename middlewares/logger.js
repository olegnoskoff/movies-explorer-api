const winston = require('winston');
const expressWinston = require('express-winston');

const getLogger = (filename) => new winston.transports.File({
  filename,
  maxSize: '20m',
  maxFiles: 1,
});

const requestLogger = expressWinston.logger({
  transports: [getLogger('request.log')],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [getLogger('error.log')],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
