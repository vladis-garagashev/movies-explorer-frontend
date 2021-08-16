import React from 'react';
import './MoviesCard.css'
import img from '../../images/movie-card__img.png'
import Button from '../Button/Button';

function MoviesCard({ btnClassName, btnTitle }) {
  return (
    <li className="movie-card">
      <img src={img} alt="Картинка" className="movie-card__image" />
      <div className="movie-card__content">
        <h2 className="movie-card__title">33 слова о дизайне</h2>
        <p className="movie-card__duration">1ч 17м</p>
      </div>
      <Button className={btnClassName} type="button">{btnTitle}</Button>
    </li>
  );
}

export default MoviesCard;
