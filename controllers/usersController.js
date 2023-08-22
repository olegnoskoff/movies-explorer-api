const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { UnauthorizedError, ConflictError } = require('../errors');
const { handleMongooseError } = require('../utils/handleMongooseError');
const { ERROR_MESSAGES } = require('../utils/constants');
const configDefault = require('../utils/configDefault');
const { SALT_LENGTH } = require('../utils/configDefault');
const { NotFoundError } = require('../errors');

const { JWT_SECRET = configDefault.JWT_SECRET } = process.env;
const { NODE_ENV } = process.env;

async function createUser(req, res, next) {
  try {
    const { email, password, name } = req.body;
    const passwordHash = await bcrypt.hash(password, +SALT_LENGTH);

    const newUser = await User.create({
      email,
      password: passwordHash,
      name,
    });

    const userResponse = newUser.toObject();
    delete userResponse.password;
    res.status(201).send(userResponse);
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError(ERROR_MESSAGES.USER_CONFLICT));
    }

    if (err instanceof mongoose.Error) {
      return next(handleMongooseError(err));
    }

    return next(err);
  }

  return res.status(500).send('Internal Server Error'); // Пример возврата ошибки сервера
}

async function getUserInfo(req, res, next) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    res.send(user);
  } catch (error) {
    next(error);
  }
}

async function updateUserInfo(req, res, next) {
  try {
    const userId = req.user._id;
    const { email, name } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email, name },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    res.send(updatedUser); // Вернуть обновленного пользователя
  } catch (error) {
    if (error.code === 11000) {
      return next(new ConflictError(ERROR_MESSAGES.USER_CONFLICT));
    }

    if (error instanceof mongoose.Error) {
      return next(handleMongooseError(error));
    }

    return next(error);
  }

  return null; // Явный возврат, но необязательный
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedError(ERROR_MESSAGES.WRONG_CREDENTIALS);
    }

    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET, { expiresIn: '7d' });

    res.send({ token });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createUser,
  getUserInfo,
  updateUserInfo,
  login,
};
