import React from 'react';
import Footer from '../Footer/Footer';

import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
  return (
    <>
      <Header/>
      <main className="content">
        <SearchForm/>
        <MoviesCardList saved={true}/> {/* Временно */}
      </main>
      <Footer/>
    </>
  );
}

export default SavedMovies;
