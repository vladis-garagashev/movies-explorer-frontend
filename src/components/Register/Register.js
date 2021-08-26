import React, { useEffect } from 'react';
import { useFormValidation } from '../../hooks/useForm';

import './Register.css'
import AuthForm from '../AuthForm/AuthForm';

function Register({ handleRegister }) {
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
      handleRegister(inputValues);
    };

    //-----------------------------------
  return (
    <main className="content">
      <section className="register">
        <AuthForm
          heading="Добро Пожаловать!"
          btnText="Зарегистрироваться"
          captionText="Уже зарегистрированы?"
          captionLinkText="Войти"
          redirectPath="/sign-in"
          isValid={isValid}
          onSubmit={handleSubmit}
        >
          <section className="form__section">
            <label htmlFor="name" className="form__label">Имя</label>
            <input
              className={`form__input ${errors.name ? "form__input_type_error" : ""}`}
              type="text"
              name="name"
              minLength="2"
              maxLength="40"
              required
              value={inputValues.name}
              onChange={handleChange}
            />
            <span className="form__input_error" id="name-error">{errors.name}</span>
          </section>

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
              minLength="6"
              value={inputValues.password}
              onChange={handleChange}
              required
            />
            <span className="form__input_error" id="password-error">{errors.password}</span>
          </section>
        </AuthForm>
      </section>
    </main>
  );
}

export default Register;
