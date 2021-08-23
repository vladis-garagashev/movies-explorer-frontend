import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function Movies({ saved, movies, handleSearch }) {
  const value = useContext(AppContext);
  return (
    <>
      <Header/>
      <main className="content">
        <SearchForm handleSearch={handleSearch}/>
        {value.isLoading ? <Preloader/> : <MoviesCardList saved={saved} movies={movies}/>}
      </main>
      <Footer/>
    </>
  );
}

export default Movies;
