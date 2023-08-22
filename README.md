# Movies Explorer (бэкенд-часть)

Бэкенд-части приложения с API-сервером


### Структура приложения 
Приложение состоит из двух частей:
1. Movies Explorer (бэкенд-часть)
2. Movies Explorer (фронтенд-часть) - в разработке.


## Демо
API-сервер доступен по адресу: [api.movies100.nomoreparties.co] (https://api.movies100.nomoreparties.co)

## API
### Регистрация пользователя
`POST /signup` - создаёт пользователя с переданными в теле email, password и name

### Аутентификация
`POST /signin` - проверяет переданные в теле почту и пароль и возвращает JWT-токен

### Информация о пользователе
`GET /users/me` - возвращает информацию о пользователе (email и имя)  
`PATCH /users/me` - обновляет информацию о пользователе (email и имя)

### Фильмы
`GET /movies` - возвращает все сохранённые текущим  пользователем фильмы  
`POST /movies` - создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId  
`DELETE /movies/_id` - удаляет сохранённый фильм по id 
