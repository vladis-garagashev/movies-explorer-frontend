import React from 'react';
import { Link } from 'react-router-dom';

import './Portfolio.css'
import portofioItemIcon from '../../images/portfolio__item-icon.svg'

function Portfolio() {
  return (
    <div className="portfolio">
        <h3 className="portfolio__title">Портфолио</h3>

        <ul className="portfolio__list">
          <li className="portfolio__item">
            <Link className="portfolio__item-link" to="#" target="_blank">
              <h4 className="portfolio__item-title">Статичный сайт</h4>
              <p className="portfolio__item-icon">↗</p>
            </Link>
          </li>

          <li className="portfolio__item">
            <Link className="portfolio__item-link" to="#" target="_blank">
              <h4 className="portfolio__item-title">Адаптивный сайт</h4>
              <p className="portfolio__item-icon">↗</p>
            </Link>
          </li>

          <li className="portfolio__item">
            <Link className="portfolio__item-link" to="#" target="_blank">
              <h4 className="portfolio__item-title">Одностраничное приложение</h4>
              <p className="portfolio__item-icon">↗</p>
            </Link>
          </li>
        </ul>
      </div>
  );
}

export default Portfolio;
