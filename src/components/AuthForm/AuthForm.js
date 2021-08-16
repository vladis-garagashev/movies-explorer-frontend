import React from 'react';
import { Link } from 'react-router-dom';

import './AuthForm.css'
import Button from '../Button/Button';
import Input from '../Input/Input';
import Logo from '../Logo/Logo';

function AuthForm({ heading, btnText, captionText, captionLinkText, redirectPath, children }) {
  return (
    <form className="form">
      <Link className="form__link" to="/">
        <Logo/>
      </Link>
      <h2 className="form__heading">{heading}</h2>
      {children}

      <section className="form__section">
        <label htmlFor="email" className="form__label">E-mail</label>
        <Input
          className="form__input"
          type="email"
          name="email"
        />
        <span className="form__input_error" id="email-error"></span>
      </section>

      <section className="form__section">
        <label htmlFor="password" className="form__label">Пароль</label>
        <Input
          className="form__input form__input_type_error"
          type="password"
          name="password"
          required={true}
        />
        <span className="form__input_error" id="password-error">Что-то пошло не так</span>
      </section>

      <Button  className="button button_type_blue" type="submit">{btnText}</Button>
      <div className="form__caption-container">
        <p className="form__caption-text">{captionText}</p>
        <Link className="form__caption-link" to={redirectPath}>{captionLinkText}</Link>
      </div>
    </form>
  );
}

export default AuthForm;
