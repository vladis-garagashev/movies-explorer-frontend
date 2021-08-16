import React from 'react';

import './Logo.css';
import logo from '../../images/logo.svg'

function Logo(props) {
  return (
      <img className="logo" src={logo} alt="Movies Explorer" />
  );
}

export default Logo;
