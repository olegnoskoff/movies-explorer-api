const { STATUS_CODES, ERROR_MESSAGES } = require('../utils/constants');

function errorHandler(err, res) {
  const { statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR } = err;
  let { message } = err;

  if (statusCode === STATUS_CODES.INTERNAL_SERVER_ERROR) {
    message = ERROR_MESSAGES.UNKNOWN_ERROR;
  }

  res.status(statusCode).send({ message });
}

module.exports = { errorHandler };
