import React from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';

function MoviesCardList({ saved, movies }) {
  return (
    <section className="movies-cards">
      {movies.length === 0 && (<p>Нет фильмов</p>)}
      <ul className="movies-cards__list">
        {movies.map((movie) => (
              <MoviesCard
                key={movie.id}
                movie={movie}
                btnClassName="button button_type_delete-movie"
              />
        ))}
      </ul>
      {!saved && <Button className="button button_type_load-more" type="button">Ещё</Button>}
    </section>
  );
}

export default MoviesCardList;
