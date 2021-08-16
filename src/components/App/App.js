import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {useMediaQuery} from '@react-hook/media-query';

import { AppContext } from '../../contexts/AppContext';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formEditing, setFormEditing] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileWidth = useMediaQuery('(max-width: 1023px)');

  useEffect(() => {
    // Проверяем ширину экрана
    if (!mobileWidth) {
      setIsMenuOpen(false);
    }
  }, [mobileWidth]);

  // Обработчик открытия и закрытия меню
  const handleMenuButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Обработчик изменения состояния компонента Profile
  const handleFormEditing = () => {
    setFormEditing(!formEditing);
  }
  return (
    <div className="page__container">
      <AppContext.Provider
        value={{
          loggedIn: loggedIn,
          isMenuOpen: isMenuOpen,
          onMenuClick: handleMenuButtonClick,
          loading: loading,
          mobileWidth: mobileWidth,
        }}
      >
        <Switch>
            <Route exact path="/">
            <Main/>
          </Route>

          <Route path="/movies">
            <Movies/>
          </Route>

          <Route path="/saved-movies">
            <SavedMovies/>
          </Route>

          <Route path="/profile">
            <Profile
              isEditing={formEditing}
              handleFormEditing={handleFormEditing}/>
          </Route>

          <Route path="/sign-up">
            <Register/>
          </Route>

          <Route path="/sign-in">
            <Login/>
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>

          <Route path="/">
            {loggedIn ? <Redirect to="/movies" /> : <Redirect exact to="/" />}
          </Route>
        </Switch>
      </AppContext.Provider>
    </div>
  );
}

export default App;
