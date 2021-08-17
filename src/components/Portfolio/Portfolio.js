import React from 'react';

import './Portfolio.css'

function Portfolio() {
  return (
    <div className="portfolio">
        <h3 className="portfolio__title">Портфолио</h3>

        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a className="portfolio__item-link" href="https://github.com/vladis-garagashev/how-to-learn" target="_blank" rel="noreferrer">
              <h4 className="portfolio__item-title">Статичный сайт</h4>
              <p className="portfolio__item-icon">↗</p>
            </a>
          </li>

          <li className="portfolio__item">
            <a className="portfolio__item-link" href="https://github.com/vladis-garagashev/russian-travel" target="_blank" rel="noreferrer">
              <h4 className="portfolio__item-title">Адаптивный сайт</h4>
              <p className="portfolio__item-icon">↗</p>
            </a>
          </li>

          <li className="portfolio__item">
            <a className="portfolio__item-link" href="https://github.com/vladis-garagashev/react-mesto-api-full" target="_blank" rel="noreferrer">
              <h4 className="portfolio__item-title">Одностраничное приложение</h4>
              <p className="portfolio__item-icon">↗</p>
            </a>
          </li>
        </ul>
      </div>
  );
}

export default Portfolio;
