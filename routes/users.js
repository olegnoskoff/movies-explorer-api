const express = require('express');
const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/usersController');
const { updateUserInfoValidator } = require('../utils/validators');

const users = express.Router();

// Получение информации о текущем пользователе
users.get('/me', getUserInfo);

// Обновление информации о текущем пользователе
users.patch('/me', updateUserInfoValidator, updateUserInfo);

module.exports = { users };
