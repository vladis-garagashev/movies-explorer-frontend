import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './AuthForm.css'
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import { AppContext } from '../../contexts/AppContext';

function AuthForm({ heading, btnText, captionText, captionLinkText, redirectPath, children, isValid, onSubmit }) {
  const { serverErrorMessage, setServerErrorMessage } = useContext(AppContext);

  useEffect(() => {
    setServerErrorMessage('');
  }, [])
  return (
    <form
      className="form"
      method="POST"
      noValidate
      onSubmit={onSubmit}
    >
      <Link className="form__link" to="/">
        <Logo/>
      </Link>
      <h2 className="form__heading">{heading}</h2>

      {children}

      <p className="form__error-message">{serverErrorMessage}</p>
      <Button  className="button button_type_blue" type="submit">{btnText}</Button>
      <div className="form__caption-container">
        <p className="form__caption-text">{captionText}</p>
        <Link className="form__caption-link" to={redirectPath}>{captionLinkText}</Link>
      </div>
    </form>
  );
}

export default AuthForm;
