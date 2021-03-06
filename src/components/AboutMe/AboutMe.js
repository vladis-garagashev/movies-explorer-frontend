import React from 'react';

import './AboutMe.css'
import photo from '../../images/photo.jpg'
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className="about-me"  name ="about-me">
      <h2 className="about-me__title">Студент</h2>

      <div className="about-me__content">
        <p className="about-me__name">Владислав</p>
        <p className="about-me__about">Фронтенд-разработчик, 25 лет</p>
        <p className="about-me__text">Я родился и живу в Полевском. Люблю смотреть фильмы, слушать музыку, а еще увлекаюсь игрой на фортепиано. Недавно начал кодить. После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами.</p>
        <img  className="about-me__photo" src={photo} alt="Фото студента"/>

        <ul className="about-me__links">
          <li className="about-me__item">
            <a className="about-me__item-link" href="https://www.facebook.com/vladis.garagashev" target="_blank" rel="noreferrer">Facebook</a>
          </li>
          <li className="about-me__item">
            <a className="about-me__item-link" href="https://github.com/vladis-garagashev" target="_blank" rel="noreferrer">GitHub</a>
            </li>
        </ul>
      </div>

      <Portfolio/>
    </section>
  );
}

export default AboutMe;
