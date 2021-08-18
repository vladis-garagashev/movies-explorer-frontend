import React, { useEffect } from 'react';
import { useFormValidation } from '../../hooks/useForm';

import './Login.css'
import AuthForm from '../AuthForm/AuthForm';

function Login({ handleLogin }) {

  const { inputValues, handleChange, resetFrom, errors, isValid } =
    useFormValidation();
  //-----------------------------------

  // Сброс полей формы
  useEffect(() => {
    resetFrom();
  }, [resetFrom]);

  //-----------------------------------

  // Обработчик сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(inputValues);
  };

  //-----------------------------------
  return (
    <main className="content">
      <section className="login">

        <AuthForm
          heading="Рады видеть!"
          btnText="Войти"
          captionText="Ещё не зарегистрированы?"
          captionLinkText="Регистрация"
          redirectPath="/sign-up"
          isValid={isValid}
          onSubmit={handleSubmit}
        >
          <section className="form__section">
            <label htmlFor="email" className="form__label">E-mail</label>
            <input
              className={`form__input ${errors.email ? "form__input_type_error" : ""}`}
              type="email"
              name="email"
              required
              value={inputValues.email}
              onChange={handleChange}
            />
            <span className="form__input_error" id="email-error">{errors.email}</span>
          </section>

          <section className="form__section">
            <label htmlFor="password" className="form__label">Пароль</label>
            <input
              className={`form__input ${errors.password ? "form__input_type_error" : ""}`}
              type="password"
              name="password"
              required
              value={inputValues.password}
              onChange={handleChange}
            />
            <span className="form__input_error" id="password-error">{errors.password}</span>
          </section>
        </AuthForm>
      </section>
    </main>
  );
}

export default Login;
