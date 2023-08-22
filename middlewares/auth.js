/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');
const { ERROR_MESSAGES } = require('../utils/constants');
const configDefault = require('../utils/configDefault');

const { JWT_SECRET = configDefault.JWT_SECRET } = process.env;

function auth(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: ERROR_MESSAGES.UNAUTHORIZED });
    }

    const token = authorization.replace('Bearer ', '');

    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
      next();
    } catch (err) {
      throw new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED);
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { auth };
