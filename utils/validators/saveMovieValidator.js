const { celebrate, Joi } = require('celebrate');
const { validateUrl } = require('../validateUrl');

// Валидатор для сохранения фильма
const saveMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(), // Страна
    director: Joi.string().required(), // Режиссер
    duration: Joi.number().required(), // Продолжительность
    year: Joi.string().required(), // Год выпуска
    description: Joi.string().required(), // Описание
    image: Joi.string().required().custom(validateUrl), // Изображение (URL)
    trailerLink: Joi.string().required().custom(validateUrl), // Ссылка на трейлер (URL)
    thumbnail: Joi.string().required().custom(validateUrl), // Миниатюра (URL)
    nameRU: Joi.string().required(), // Название на русском
    nameEN: Joi.string().required(), // Название на английском
    movieId: Joi.number().required(), // Идентификатор фильма
  }),
});

module.exports = { saveMovieValidator };
