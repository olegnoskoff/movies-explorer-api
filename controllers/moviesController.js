const mongoose = require('mongoose');
const { Movie } = require('../models/movie');
const { ConflictError } = require('../errors');
const { NotFoundError, ForbiddenError } = require('../errors');
const { handleMongooseError } = require('../utils/handleMongooseError');
const { ERROR_MESSAGES } = require('../utils/constants');

async function deleteMovie(req, res, next) {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id).populate('owner');

    if (!movie) {
      throw new NotFoundError(ERROR_MESSAGES.MOVIE_NOT_FOUND);
    }

    const ownerId = movie.owner.id;
    const userId = req.user._id;

    if (ownerId !== userId) {
      throw new ForbiddenError(ERROR_MESSAGES.UNAUTHORIZED);
    }

    await Movie.findByIdAndRemove(id);

    res.send(movie);
  } catch (err) {
    if (err instanceof mongoose.Error) {
      next(handleMongooseError(err));
      return;
    }

    next(err);
  }
}

async function getMovies(req, res, next) {
  try {
    const userId = req.user._id;
    const movies = await Movie.find({ owner: userId }).populate('owner');
    res.send(movies);
  } catch (error) {
    next(handleMongooseError(error));
  }
}

async function saveMovies(req, res, next) {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      nameRU,
      nameEN,
      movieId,
    } = req.body;

    const ownerId = req.user._id;

    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      nameRU,
      nameEN,
      movieId,
      owner: ownerId,
    });

    await movie.populate('owner').execPopulate();
    res.status(201).send(movie);
  } catch (error) {
    if (error.code === 11000) {
      next(new ConflictError(ERROR_MESSAGES.MOVIE_CONFLICT));
    } else if (error instanceof mongoose.Error) {
      next(handleMongooseError(error));
    } else {
      next(error);
    }
  }
}

module.exports = { deleteMovie, getMovies, saveMovies };
