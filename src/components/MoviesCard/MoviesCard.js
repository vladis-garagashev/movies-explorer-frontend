import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './MoviesCard.css'
import Button from '../Button/Button';

function MoviesCard({ movie, btnClassName, btnTitle }) {
  console.log(movie)
  const currentUser = useContext(CurrentUserContext);

  // // Определяем, являемся ли мы владельцем текущей карточки
  // const isOwn = movie.owner === currentUser._id;

  return (
    <li className="movie-card">
      <a className="movie-card__link" href={movie.trailer} target="_blank" rel="noreferrer">
        <img src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} className="movie-card__image" />
        <div className="movie-card__content">
          <h2 className="movie-card__title">{movie.nameRU}</h2>
          <p className="movie-card__duration">{movie.duration}</p>
        </div>
        <Button className={btnClassName} type="button">{btnTitle}</Button>
      </a>
    </li>
  );
}

export default MoviesCard;
