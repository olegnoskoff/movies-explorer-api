const { celebrate, Joi } = require('celebrate');

// Валидатор для обновления информации о пользователе
const updateUserInfoValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(), // Email
    name: Joi.string().required().min(2).max(30),
  }), // Имя пользователя (минимум 2, максимум 30 символов)
});

module.exports = { updateUserInfoValidator };
