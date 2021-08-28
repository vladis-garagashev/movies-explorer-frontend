import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import {useMediaQuery} from '@react-hook/media-query';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { AppContext } from '../../contexts/AppContext';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';

import * as constants from '../../config/constants';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formEditing, setFormEditing] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [moviesPerPage, setMoviesPerPage] = useState(constants.moviesPerMobilePage);
  const [moviesNotFound, setMoviesNotFound] = useState(false);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [showMoreBtnVisible, setShowMoreBtnVisible] = useState(false);

  const [isSuccess, setSuccess] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState('');

  const [disableInput, setDisableInput] = useState(false)


  const history = useHistory();
  const tabletWidth = useMediaQuery(`(min-width: ${constants.tabletWidth}px)`);
  const desktopWidth = useMediaQuery(`(min-width: ${constants.desktopWidrh}px)`);
  const imagesServerUrl = 'https://api.nomoreparties.co';

  //-----------------------------------

  // Проверяем есть ли токен
  useEffect(() => {
    checkToken();
  }, [])

  // Получаем информацию и карточки пользователя
  useEffect(() => {
    if (loggedIn) {
      const movies = localStorage.getItem('movies')
      if (movies) setMovies(JSON.parse(movies));

      mainApi
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((error) => console.log(`Ошибка! ${error.status}`));

        mainApi
        .getMovies()
        .then((data) => {
          const savedMovies = data.map((movie) => {
            return {
              ...movie,
              saved: true
            }
          })
          setSavedMovies(savedMovies);
        })
        .catch((error) => console.log(`Ошибка! ${error.status}`));
    }
  }, [loggedIn]);

  // Проверяем ширину экрана
  useEffect(() => {
    handleMoviesPerPage()
  }, [desktopWidth, tabletWidth]);

  //-----------------------------------

  // Функция регистрации пользователя
  const handleRegister = ({ email, password, name }) => {
    setDisableInput(true);
    setIsLoading(true);
    mainApi
      .register(email, password, name)
      .then((userData) => {
        localStorage.setItem('authorized', true);
        setCurrentUser(userData);
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((error) => {
        if (error.status === 409) {
          setServerErrorMessage('Пользователь с таким email уже существует.');
        } else if (error.status === 400) {
          setServerErrorMessage('При регистрации пользователя произошла ошибка.')
        } else if (error.status === 500) {
          setServerErrorMessage('На сервере произошла ошибка.')
        };
      })
      .finally(() => {
        setIsLoading(false);
        setDisableInput(false);
      });
  };

  //-----------------------------------

  // Функция авторизации пользователя
  const handleLogin = ({ email, password }) => {
    setDisableInput(true);
    setIsLoading(true);
    mainApi
      .login(email, password)
      .then((userData) => {
        localStorage.setItem('authorized', true);
        setCurrentUser(userData);
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((error) => {
        if (error.status === 400) {
          setServerErrorMessage('Вы ввели неправильный логин или пароль.');
        } else if (error.status === 401) {
          setServerErrorMessage('При авторизации произошла ошибка. Токен не передан или передан не в том формате.')
        } else if (error.status === 500) {
          setServerErrorMessage('На сервере произошла ошибка.')
        };
      })
      .finally(() => {
        setIsLoading(false);
        setDisableInput(false);
      });
  };

  //-----------------------------------

  // Функция деавторизации пользователя
  const handleSignout = () => {
    mainApi
      .signout()
      .then(() => {
        localStorage.removeItem('authorized');
        localStorage.removeItem('movies');
        history.push('/');
        setLoggedIn(false);
        setCurrentUser();
      })
      .catch((error) => {
        if (error.status === 401) {
          setServerErrorMessage('Произошла ошибка. Токен не передан или передан не в том формате.')
        } else if (error.status === 500) {
          setServerErrorMessage('На сервере произошла ошибка.')
        };
      });
  };

  //-----------------------------------

  // Функция проверки наличия токена
  const checkToken = () => {
    const token = localStorage.getItem('authorized')
    if (token) {
      mainApi.checkToken()
        .then((userData) => {
          setCurrentUser(userData)
          setLoggedIn(true);
        })
        .catch((error) => console.log(`Ошибка авторизации. ${error.status}`))
    };
  };

  //-----------------------------------

  // Обработчики обновления данных пользователя
  const handleUpdateUser = (formData) => {
    setDisableInput(true);
    setIsLoading(true);
    mainApi
      .editUserInfo(formData)
      .then((newUserData) => {
        setSuccess(true);
        setCurrentUser(newUserData);
        handleFormEditing()
      })
      .catch((error) => {
        setSuccess(false);
        if (error.status === 409) {
          setServerErrorMessage('Пользователь с таким email уже существует.');
        } else if (error.status === 400) {
          setServerErrorMessage('При обновлении профиля произошла ошибка.')
        } else if (error.status === 500) {
          setServerErrorMessage('На сервере произошла ошибка.')
        }
      })
      .finally(() => {
        setIsLoading(false);
        setDisableInput(false);
      });
  };

  //-----------------------------------

  // Поиск фильмов
  const handleSearchAllMovies = (searchQuery) => {
    setDisableInput(true);
    setIsLoading(true);
    moviesApi
    .getMovies()
      .then((movies) => {
        // Форматируем данные
        const formatedMovies = movies.map((movie) => {
          return {
            ...movie,
            image: imagesServerUrl + movie.image.url,
            trailer: movie.trailerLink,
            thumbnail: imagesServerUrl + movie.image.formats.thumbnail.url,
            movieId: movie.id.toString(),
          }});

        //Ищем фильмы по ключевому слову
        const searchedMovies = formatedMovies.filter((movie) => {
          return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
        });

        //Проверяем есть ли сохраненные фильмы у пользователя
        searchedMovies.forEach((movie) => {
          if (savedMovies.find((savedMovie) => savedMovie.movieId.toString() === movie.movieId)) {
            movie.saved = true;
          } else movie.saved = false;
        });
        setMoviesNotFound(searchedMovies.length === 0);

        // Добавляем фильмы с localStorage и state
        localStorage.setItem('movies', JSON.stringify(searchedMovies));
        setMovies(searchedMovies);
        handleMoviesPerPage();
      })
      .catch((error) => {
        console.log(error)
        setMoviesNotFound(false);
        setServerErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => {
        setIsLoading(false);
        setDisableInput(true);
      });
  };

  //-----------------------------------

  // Поиск среди сохраненных фильмов
  const handleSearckSavedMovies = (searchQuery) => {
    setDisableInput(true);
    setIsLoading(true);
    mainApi
      .getMovies()
      .then((movies) => {
        const searchedMovies = movies.filter((movie) => {
          return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setMoviesNotFound(searchedMovies.length === 0);
        setSavedMovies(searchedMovies);
      })
      .catch((error) => {
        console.log(error)
        setMoviesNotFound(false);
        setServerErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => {
        setIsLoading(false);
        setDisableInput(false);
      });
  };

  //-----------------------------------

  // Обработчик сохранения фильма
  const handleSaveMovie = (movie) => {
    const savedMovie = savedMovies.find((savedMovie) => savedMovie.movieId.toString() === movie.movieId);

      if (savedMovie) {
        handleDeleteMovie(savedMovie);
      } else {
        mainApi
          .addMovie(movie)
          .then((newMovie) => {
            newMovie.saved = true;
            setSavedMovies([newMovie, ...savedMovies]);
            movie.saved = true;
            setMovies(([...movies]));
            localStorage.setItem('movies', JSON.stringify(movies));
          })
          .catch((error) => console.log(error));
      };
  };

  //-----------------------------------

  // Функция удаления филмьа
  const handleDeleteMovie = (savedMovie) => {
    const movie = movies.find((movie) => movie.movieId === savedMovie.movieId.toString());

    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((m) => m._id !== savedMovie._id));
        movie.saved = false;
        setMovies([...movies]);
        localStorage.setItem('movies', JSON.stringify(movies));
      })
      .catch((error) => console.log(error));
  };


  //-----------------------------------

  // Обработчик открытия и закрытия меню
  const handleMenuButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //-----------------------------------

  // Обработчик изменения состояния компонента Profile
  const handleFormEditing = () => {
    if (formEditing) {
      setFormEditing(false);
    } else {
      setSuccess(false);
      setFormEditing(true);
    };
  };

  //-----------------------------------

  // Обработчик фильтрации фильмов по продолжительности
  const handleFilterMovies = () => {
    setIsShortMovies(!isShortMovies);
  };

  const handleShortMovies = (movies) => movies.filter((movie) => movie.duration <= constants.shortFilmsDuration);

  //-----------------------------------

  // Обработчик отображения количества фильмов
  const handleMoviesPerPage = () => {
    if (desktopWidth) {
      setIsMenuOpen(false);
      setMoviesPerPage(constants.moviesPerPageDesktop);
    } else if(tabletWidth) {
      setMoviesPerPage(constants.moviesPerPageTablet);
    } else {
      setMoviesPerPage(constants.moviesPerMobilePage);
    };
  };

  // Обработчик клика по конпке Еще
  const handleMoreMoviesClick = () => {
    if (desktopWidth) {
      setMoviesPerPage(moviesPerPage + constants.showMoreForDesktop);
    } else {
      setMoviesPerPage(moviesPerPage + constants.showMore);
    };
  };

  //-----------------------------------

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <AppContext.Provider
          value={{
            loggedIn,
            isMenuOpen,
            onMenuClick: handleMenuButtonClick,
            isLoading,
            desktopWidth,
            handleFilterMovies,
            isShortMovies,
            setIsShortMovies,
            setMoviesNotFound,
            serverErrorMessage,
            setServerErrorMessage,
            setShowMoreBtnVisible,
            showMoreBtnVisible,
            disableInput,
            setDisableInput,
            isSuccess,
          }}
        >
          <Switch>
            <Route exact path="/">
              <Main/>
            </Route>

            <ProtectedRoute
              exact path="/movies"
              component={Movies}
              movies={movies}
              moviesPerPage={moviesPerPage}
              handleSearch={handleSearchAllMovies}
              handleShortMovies={handleShortMovies}
              onBtnClick={handleSaveMovie}
              moviesNotFound={moviesNotFound}
              serverErrorMessage={serverErrorMessage}
              onLoadMore={handleMoreMoviesClick}
              checkToken={checkToken}
            />

            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              movies={savedMovies}
              handleSearch={handleSearckSavedMovies}
              handleShortMovies={handleShortMovies}
              onBtnClick={handleDeleteMovie}
              moviesNotFound={moviesNotFound}
              serverErrorMessage={serverErrorMessage}
              checkToken={checkToken}
            />

            <ProtectedRoute
              exact path="/profile"
              component={Profile}
              isEditing={formEditing}
              onUpdateUser={handleUpdateUser}
              onSignout={handleSignout}
              handleFormEditing={handleFormEditing}
              checkToken={checkToken}
            />

            <Route exact path="/sign-up">
              <Register handleRegister={handleRegister}/>
            </Route>

            <Route path="/sign-in">
              <Login handleLogin={handleLogin}/>
            </Route>

            <ProtectedRoute
              path="*"
              component={PageNotFound}
              checkToken={checkToken}
            />
          </Switch>
        </AppContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
