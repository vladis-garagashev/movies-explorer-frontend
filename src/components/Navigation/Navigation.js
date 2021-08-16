import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

import './Navigation.css';
import Button from '../Button/Button';
import ProfileLink from '../ProfileLink/ProfileLink';

function Navigation() {
  const value = useContext(AppContext);

  const menuBtnClassName = `button button_type_menu ${value.isMenuOpen ? "button_type_menu_opened" : ""}`;
  const menuBackgroundClassName = `menu__background ${value.isMenuOpen ? "menu__background_opened" : ""}`;
  const menuContainerClassName = `menu__container ${value.isMenuOpen ? "menu__container_opened" : ""}`;

  return (
    <nav className="menu">
      {value.loggedIn ? (
        <>
          <Button className={menuBtnClassName}
          onClick={value.onMenuClick}>
            <span></span>
          </Button>
          <div className={menuBackgroundClassName}></div>
            <div className={menuContainerClassName}>
            <ul className="menu__list">
              {value.mobileWidth && (
                <li className="menu__item">
                  <NavLink className="menu__link" activeClassName="menu__link_active" exact to="/">
                    Главная
                  </NavLink>
                </li>
              )}
              <li className="menu__item">
                <NavLink className="menu__link" activeClassName="menu__link_active" to="/movies">
                  Фильмы
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink className="menu__link" activeClassName="menu__link_active" to="/saved-movies">
                    Сохраненные фильмы
                </NavLink>
              </li>
            </ul>
              {value.mobileWidth && (<ProfileLink/>)}
         </div>
        </>
      ) : (
        <ul className="menu__list menu__list_type_main">
            <li className="menu__item menu__item_type_main">
              <Link className="menu__link menu__link_type_main" to="sign-up">
                Регистрация
              </Link>
            </li>

            <li className="menu__item menu__item_type_main">
              <Link className="menu__link menu__link_type_main" to="sign-in">
                <Button className="button button_type_green" type="button">Войти</Button>
              </Link>
            </li>
        </ul>
      )}
    </nav>
  );
}

export default Navigation;
