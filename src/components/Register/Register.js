import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import './Register.css'

function Register() {
  return (
    <main className="content">
      <section className="register">
        <AuthForm
          heading="Добро Пожаловать!"
          btnText="Зарегистрироваться"
          captionText="Уже зарегистрированы?"
          captionLinkText="Войти"
          redirectPath="/sign-in"
        >
          <section className="form__section">
            <label htmlFor="name" className="form__label">Имя</label>
            <Input
              className="form__input"
              type="text"
              name="name"
            />
            <span className="form__input_error" id="name-error"></span>
          </section>
        </AuthForm>
      </section>
    </main>
  );
}

export default Register;
