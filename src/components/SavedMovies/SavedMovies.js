import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';

function SavedMovies( { saved, movies } ) {
  const value = useContext(AppContext);

  return (
    <>
      <Header/>
      <main className="content">
        <SearchForm/>
        {value.IsLoading ? <Preloader/> : <MoviesCardList saved={saved} movies={movies}/>}

      </main>
      <Footer/>
    </>
  );
}

export default SavedMovies;
