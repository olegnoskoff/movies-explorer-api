const { celebrate, Joi } = require('celebrate');

const { validateObjectId } = require('../validateObjectId');

// Валидатор для удаления фильма по ID
const deleteMoviesValid = celebrate({
  params: Joi.object().keys({
    id: Joi.string().custom(validateObjectId),
  }),
});

module.exports = { deleteMoviesValid };
