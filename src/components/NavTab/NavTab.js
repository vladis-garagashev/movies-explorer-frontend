import React from 'react';
import Button from '../Button/Button';
import { Link } from 'react-scroll'

import './NavTab.css';

function NavTab() {
  return (
    <ul className="nav-tab">
      <li className="nav-tab__link">
        <Link to="about" smooth={true} duration={500}>
          <Button className="button button_type_grey" type="button">О проекте</Button>
        </Link>
      </li>
      <li className="nav-tab__link">
        <Link to="techs" smooth={true} duration={500}>
          <Button className="button button_type_grey" type="button">Технологии</Button>
        </Link>
      </li>
      <li className="nav-tab__link">
        <Link to="about-me" smooth={true} duration={500}>
          <Button className="button button_type_grey" type="button">Студент</Button>
        </Link>
      </li>
    </ul>
  );
}

export default NavTab;
