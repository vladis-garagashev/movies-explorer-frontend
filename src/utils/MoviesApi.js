class MoviesApi {
  constructor({ adress }) {
    this._adress = adress;
  }

  //-----------------------------------

  // Функция обработки ответа промиса
  _handleResponse = (res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);

  //-----------------------------------

  // Функция получения сохраненных фильмов
  getMovies() {
    return fetch(`${this._adress}/`)
      .then((res) => this._handleResponse(res));
  }
}

//-----------------------------------

//Инстанцирование экземпляра класса Api
const moviesApi = new MoviesApi({
  adress: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi;
