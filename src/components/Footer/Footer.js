import React from 'react';

import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <p className="footer__copyright">&copy; {year}</p>
      <ul className="footer__links">
        <li className="footer__links-item">
          <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
        </li>
        <li className="footer__links-item">
          <a className="footer__link" href="https://github.com/vladis-garagashev" target="_blank" rel="noreferrer">Github</a>
        </li>
        <li className="footer__links-item">
          <a className="footer__link" href="https://www.facebook.com/vladis.garagashev" target="_blank" rel="noreferrer">Facebook</a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
