import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import {useMediaQuery} from '@react-hook/media-query';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { AppContext } from '../../contexts/AppContext';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formEditing, setFormEditing] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const history = useHistory();
  const mobileWidth = useMediaQuery('(max-width: 1023px)');

  //-----------------------------------

  // Проверяем есть ли токен
  useEffect(() => {
    checkToken();

    setMovies(JSON.parse(localStorage.getItem('movies')))
  }, [])

  // Получаем информацию и карточки пользователя
  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((error) => console.log(error));

        mainApi
        .getMovies()
        .then((data) => {
          setSavedMovies(data);
        })
        .catch((error) => console.log(error));
    }
  }, [loggedIn]);

  // Проверяем ширину экрана
  useEffect(() => {
    if (!mobileWidth) {
      setIsMenuOpen(false);
    }
  }, [mobileWidth]);

  //-----------------------------------

  // Функция обработчик ошибки
  const handleError = (err) => {
    console.log(err);
  };

  // Функция регистрации пользователя
  const handleRegister = ({ email, password, name }) => {
    setIsLoading(true);
    mainApi
      .register(email, password, name)
      .then(() => {
        history.push('/sign-in');
      })
      .catch(handleError)
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Функция авторизации пользователя
  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
    mainApi
      .login(email, password)
      .then((userData) => {
        localStorage.setItem('authorized', true);
        setCurrentUser(userData);
        setLoggedIn(true);
        history.push('/');
      })
      .catch(handleError)
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Функция деавторизации пользователя
  const handleSignout = () => {
    mainApi
      .signout()
      .then(() => {
        localStorage.removeItem('authorized');
        history.push('/');
        setLoggedIn(false);
        setCurrentUser();
      })
      .catch(handleError);
  };

  // Функция проверки наличия токена
  const checkToken = () => {
    const token = localStorage.getItem('authorized')
    if (token) {
      setLoggedIn(true);
    }
  };

  //-----------------------------------
  // Обработчик открытия и закрытия меню
  const handleMenuButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Обработчик изменения состояния компонента Profile
  const handleFormEditing = () => {
    setFormEditing(!formEditing);
  }

  const handleSearch = (searchQuery) => {
    setIsLoading(true)
    moviesApi
    .getMovies()
      .then((movies) => {
        const searchResponce = movies.filter((movie) => {
          return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
        })
        localStorage.setItem('movies', JSON.stringify(searchResponce));
        setMovies(searchResponce)
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }
  //-----------------------------------

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <AppContext.Provider
          value={{
            loggedIn: loggedIn,
            isMenuOpen: isMenuOpen,
            onMenuClick: handleMenuButtonClick,
            isLoading: isLoading,
            mobileWidth: mobileWidth,
          }}
        >
          <Switch>
            <Route exact path="/">
              <Main/>
            </Route>

            <ProtectedRoute
              path="/movies"
              component={Movies}
              saved={false}
              movies={movies}
              handleSearch={handleSearch}
            />

            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              saved={true}
              movies={savedMovies}
            />

            <ProtectedRoute
              path="/profile"
              component={Profile}
              isEditing={formEditing}
              handleFormEditing={handleFormEditing}
              handleSignout={handleSignout}
            />

            <Route path="/sign-up">
              <Register handleRegister={handleRegister}/>
            </Route>

            <Route path="/sign-in">
              <Login handleLogin={handleLogin}/>
            </Route>

            <ProtectedRoute
              path="*"
              component={PageNotFound}
            />

            <Route path="/">
              {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </AppContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
