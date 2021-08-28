import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, shortMovies, onBtnClick, moviesNotFound, serverErrorMessage, moviesPerPage }) {
  const { isShortMovies } = useContext(AppContext);


  const allMovies = (moviesPerPage === undefined) ? movies : movies.filter((movie, index) => index < moviesPerPage && movie);
  const allShortMovies = (moviesPerPage === undefined) ? shortMovies : shortMovies.filter((movie, index) => index < moviesPerPage && movie);
  const renderMovies = isShortMovies ? allShortMovies : allMovies;

  const captionText = moviesNotFound ? "Ничего не найдено" : serverErrorMessage;

  return (
    <section className="movies-cards">
      <p className="movies-cards__caption">{captionText}</p>
      <ul className="movies-cards__list">
      {renderMovies?.map((movie) => (
          <MoviesCard
            key={movie.movieId}
            movie={movie}
            onBtnClick={onBtnClick}
          />))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
