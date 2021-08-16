import React from 'react';

import './Login.css'
import AuthForm from '../AuthForm/AuthForm';

function Login() {
  return (
    <main className="content">
      <section className="login">

        <AuthForm
          heading="Рады видеть!"
          btnText="Войти"
          captionText="Ещё не зарегистрированы?"
          captionLinkText="Регистрация"
          redirectPath="/sign-up"
        />
      </section>
    </main>
  );
}

export default Login;
