import React, { useContext, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';

import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';

function MoviesCardList({ saved, movies }) {
  const value = useContext(AppContext);


  const [numberOfMovies, setNumberOfMovies] = useState(12);

  const handleBtnClick = () => {
    setNumberOfMovies(numberOfMovies + 3)
  }

  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        {  !saved
        ? movies?.map((movie, index) => {

          return index < numberOfMovies &&
          <MoviesCard
            key={movie.id}
            movie={movie}
            saved={saved}
          />

        })
        : movies?.map((movie) => (
          <MoviesCard
            key={movie.id}
            movie={movie}
            saved={saved}
          />))
        }
      </ul>
      {(!saved && movies?.length > 0 && numberOfMovies <  movies?.length) && <Button className="button button_type_load-more" type="button" onClick={handleBtnClick}>Ещё</Button>}
    </section>
  );
}

export default MoviesCardList;

// ? <p className="movies-cards__caption">Ничего не найдено</p>
