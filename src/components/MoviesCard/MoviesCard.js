import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './MoviesCard.css'
import Button from '../Button/Button';

function MoviesCard({ movie, onBtnClick }) {
  const currentUser = useContext(CurrentUserContext);

  const btnClassName = `
    button
    ${movie?.owner === undefined
      ? (movie.saved ? "button_type_saved-movie" : "button_type_save-movie")
      : (movie?.owner === currentUser._id ? "button_type_delete-movie" : "button_type_hidden")
    }`;

  const btnTitle = `${movie.saved ? "" : "Сохранить"}`;

  const handleBtnClick = () => {
    onBtnClick(movie)
  };

  return (
    <li className="movie-card">
      <a className="movie-card__link" href={movie.trailer} target="_blank" rel="noreferrer">
        <img src={movie.image} alt={movie.nameRU} className="movie-card__image" />
        <div className="movie-card__content">
          <h2 className="movie-card__title">{movie.nameRU}</h2>
          <p className="movie-card__duration">{`${Math.trunc(movie.duration/60) + "ч"} ${(movie.duration%60) + "м"}`}</p>
        </div>
      </a>
      <Button className={btnClassName} type="button" onClick={handleBtnClick}>{btnTitle}</Button>
    </li>
  );
}

export default MoviesCard;
