const { ValidationError } = require('../errors');
const { ERROR_MESSAGES } = require('./constants');

/**
 * Обработка ошибок Mongoose.
 * @param {Error} err Ошибка Mongoose.
 * @returns {Error} Обработанная ошибка.
 */
function handleMongooseError(err) {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    const fieldName = Object.keys(err.errors)[0];
    const errorMessage = `${ERROR_MESSAGES.WRONG_DATA_AT_FIELD} ${fieldName}`;
    return new ValidationError(errorMessage);
  }

  return err;
}

module.exports = {
  handleMongooseError,
};
