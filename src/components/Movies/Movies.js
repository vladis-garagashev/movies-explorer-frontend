import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies() {
  return (
    <>
      <Header/>
      <main className="content">
        <SearchForm/>
        <MoviesCardList saved={false}/> {/* Временно */}
      </main>
      <Footer/>
    </>
  );
}

export default Movies;
