const { celebrate, Joi } = require('celebrate');

// Валидатор для создания пользователя
const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = { createUserValidator };
