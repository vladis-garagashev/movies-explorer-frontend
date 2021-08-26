import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import Button from '../Button/Button';

function Movies({
  movies,
  moviesPerPage,
  handleSearch,
  onBtnClick,
  moviesNotFound,
  serverErrorMessage,
  onLoadMore
}) {
  const { isLoading, showMoreBtnVisible, setShowMoreBtnVisible, isShortMovies, setIsShortMovies} = useContext(AppContext);

  const shortMovies = movies.filter((m) => m.duration <= 40);
  const renderMovies = isShortMovies ? shortMovies : movies;

  useEffect(() => {
    setIsShortMovies(false)
  }, [])

  useEffect(() => {
    if(renderMovies.length > 0 && moviesPerPage < renderMovies.length) {
      setShowMoreBtnVisible(true);
    } else {
      setShowMoreBtnVisible(false)
    };
  }, [renderMovies]);

  return (
    <>
      <Header/>
      <main className="content">
        <SearchForm handleSearch={handleSearch}/>
        {isLoading
          ? <Preloader/>
          : <MoviesCardList movies={renderMovies} shortMovies={shortMovies} onBtnClick={onBtnClick} moviesNotFound={moviesNotFound} serverErrorMessage={serverErrorMessage} moviesPerPage={moviesPerPage}/>}
        {showMoreBtnVisible && <Button className="button button_type_load-more" type="button" onClick={onLoadMore}>Ещё</Button>}
      </main>
      <Footer/>
    </>
  );
}

export default Movies;
