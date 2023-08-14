const { createUserValidator } = require('./createUserValidator');
const { loginValidator } = require('./loginValidator');
const { updateUserInfoValidator } = require('./updateUserInfoValidator');
const { saveMovieValidator } = require('./saveMovieValidator');
const { deleteMoviesValid } = require('./deleteMoviesValid');

module.exports = {
  createUserValidator,
  loginValidator,
  updateUserInfoValidator,
  saveMovieValidator,
  deleteMoviesValid,
};
