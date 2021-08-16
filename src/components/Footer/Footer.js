import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <p className="footer__copyright">&copy; {year}</p>
      <ul className="footer__links">
        <li className="footer__links-item">
          <Link className="footer__link" to="#">Яндекс.Практикум</Link>
        </li>
        <li className="footer__links-item">
          <Link className="footer__link" to="#">Github</Link>
        </li>
        <li className="footer__links-item">
          <Link className="footer__link" to="#">Facebook</Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
