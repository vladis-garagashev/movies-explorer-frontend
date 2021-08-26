import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

import './Header.css'
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import ProfileLink from '../ProfileLink/ProfileLink';

function Header() {
  const { desktopWidth, loggedIn } = useContext(AppContext);

  return (
    <header className="header">
      <Link className="header__link" to="/">
        <Logo/>
      </Link>
      <Navigation/>
      {(desktopWidth && loggedIn )&& (<ProfileLink/>)}
    </header>
  );
}

export default Header;
