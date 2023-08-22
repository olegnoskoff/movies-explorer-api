const express = require('express');
const {
  getMovies,
  saveMovies,
  deleteMovie,
} = require('../controllers/moviesController');
const {
  saveMovieValidator,
  deleteMoviesValid,
} = require('../utils/validators');

const movies = express.Router();

// Получение списка фильмов
movies.get('/', getMovies);

// Сохранение фильма
movies.post('/', saveMovieValidator, saveMovies);

// Удаление фильма по ID
movies.delete('/:id', deleteMoviesValid, deleteMovie);

module.exports = { movies };
