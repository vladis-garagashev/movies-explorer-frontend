import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';

function SavedMovies( { movies, handleSearch, handleShortMovies, onBtnClick, moviesNotFound, serverErrorMessage} ) {
  const { IsLoading, isShortMovies, setIsShortMovies } = useContext(AppContext);

  const shortMovies = handleShortMovies(movies);
  const renderMovies = isShortMovies ? shortMovies : movies;

  useEffect(() => {
    setIsShortMovies(false);
  }, []);

  return (
    <>
      <Header/>
      <main className="content">
        <SearchForm handleSearch={handleSearch}/>
        {IsLoading ? <Preloader/> : <MoviesCardList movies={renderMovies} shortMovies={shortMovies} onBtnClick={onBtnClick}  moviesNotFound={moviesNotFound} serverErrorMessage={serverErrorMessage}/>}
      </main>
      <Footer/>
    </>
  );
}

export default SavedMovies;
