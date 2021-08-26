class MainApi {
  constructor({ adress }) {
    this._adress = adress;
  }

  //-----------------------------------

  // Функция обработки ответа промиса
  _handleResponse = (res) =>
    res.ok ? res.json() : Promise.reject(res);

  //-----------------------------------

  // Регистрация нового пользователя
  register(email, password, name) {
    return fetch(`${this._adress}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }).then((res) => this._handleResponse(res));
  };

  //-----------------------------------

  // Авторизация пользователя
  login(email, password){
    return fetch(`${this._adress}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => this._handleResponse(res));
  };

  //-----------------------------------

  // Выход из аккаунта
  signout() {
    return fetch(`${this._adress}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => this._handleResponse(res));
  };

  //-----------------------------------

  // Функция получения информации о пользователе
  getUserInfo() {
    return fetch(`${this._adress}/users/me`, {
      credentials: 'include',
    }).then((res) => this._handleResponse(res));
  }

  //-----------------------------------

  // Функция редактирования информации о пользователе
  editUserInfo(data) {
    return fetch(`${this._adress}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then((res) => this._handleResponse(res));
  }

  //-----------------------------------

  // Функция получения сохраненных фильмов
  getMovies() {
    return fetch(`${this._adress}/movies`, {
      credentials: 'include',
    }).then((res) => this._handleResponse(res));
  }

  //-----------------------------------

  // Функция добавления новой карточки с фильмом
  addMovie(data) {
    return fetch(`${this._adress}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailer: data.trailer,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    }).then((res) => this._handleResponse(res));
  }

  //-----------------------------------

  // Функция удаления карточки
  deleteMovie(id) {
    return fetch(`${this._adress}/movies/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((res) => this._handleResponse(res));
  }
}

//-----------------------------------

//Инстанцирование экземпляра класса Api
const mainApi = new MainApi({
  adress: 'http://localhost:5000',
});

export default mainApi;
