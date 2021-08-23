import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './MoviesCard.css'
import Button from '../Button/Button';

function MoviesCard({ movie, saved }) {

  const currentUser = useContext(CurrentUserContext);

  const btnClassName = `button ${saved ? "button_type_delete-movie" : "button_type_save-movie"}`
  const btnTitle = `${!saved && "Сохранить" }`

  // // Определяем, являемся ли мы владельцем текущей карточки
  // const isOwn = movie.owner === currentUser._id;

  return (
    <li className="movie-card">
      <a className="movie-card__link" href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} className="movie-card__image" />
        <div className="movie-card__content">
          <h2 className="movie-card__title">{movie.nameRU}</h2>
          <p className="movie-card__duration">{`${Math.trunc(movie.duration/60) + "ч"} ${(movie.duration%60) + "м"}`}</p>
        </div>
      </a>
      <Button className={btnClassName} type="button">{btnTitle}</Button>
    </li>
  );
}

export default MoviesCard;
