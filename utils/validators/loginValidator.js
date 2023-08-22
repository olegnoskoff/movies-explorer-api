const { celebrate, Joi } = require('celebrate');

// Валидатор для входа пользователя
const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = { loginValidator };
