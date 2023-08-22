const express = require('express');
const { ERROR_MESSAGES } = require('../utils/constants');
const { NotFoundError } = require('../errors');
const { auth } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/usersController');
const { createUserValidator, loginValidator } = require('../utils/validators');

const { movies } = require('./movies');
const { users } = require('./users');

const routes = express.Router();

// Обработка JSON на всех маршрутах
routes.all('*', express.json());

// Регистрация и вход
routes.post('/signup', createUserValidator, createUser);
routes.post('/signin', loginValidator, login);

// Выход пользователя
routes.post('/signout', (req, res) => {
  // Добавьте логику для удаления JWT из куки
  res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' });

  // Отправьте ответ клиенту
  res.status(200).json({ message: 'Выход выполнен успешно' });
});

// Middleware аутентификации для всех следующих маршрутов
routes.all('*', auth);

// Маршруты для users и movies
routes.use('/users', users);
routes.use('/movies', movies);

// Обработка не найденных маршрутов
routes.all('*', (req, res, next) => {
  next(new NotFoundError(ERROR_MESSAGES.PAGE_NOT_FOUND));
});

module.exports = { routes };
