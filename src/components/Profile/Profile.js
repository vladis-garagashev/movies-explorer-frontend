import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormValidation } from '../../hooks/useForm';

import './Profile.css';
import Button from '../Button/Button';
import Header from '../Header/Header';
import { AppContext } from '../../contexts/AppContext';

function Profile({ isEditing, onUpdateUser, onSignout, handleFormEditing }) {

  const { isLoading, disableInput, setDisableInput, serverErrorMessage, setServerErrorMessage } = useContext(AppContext);
  const currentUser = useContext(CurrentUserContext);
  const { inputValues, handleChange, resetFrom, errors, isValid } = useFormValidation();

  useEffect(() => {
    setServerErrorMessage('');
  }, []);

  useEffect(() => {
    isEditing ? setDisableInput(false) : setDisableInput(true);
  }, [isEditing]);

  useEffect(() => {
    if (currentUser) {
      resetFrom(currentUser, {}, true);
    }
  }, [currentUser, resetFrom]);
  //-----------------------------------

  // Обработчик сабмита формы
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser(inputValues);
  };

  //-----------------------------------
  return (
    <>
      <Header/>
      <main className="content">
        <section className="profile">
          <h2 className="profile__title">Привет, Владислав!</h2>
          <form className="profile__form">
            <section className="profile__form-section">
              <label htmlFor="name" className="profile__form-label">Имя</label>
              <span className="profile__form-input_error">{errors.name}</span>
              <input
                className={`profile__form-input ${errors.name ? "profile__form-input_type_error" : ""}`}
                type="text"
                name="name"
                required
                disabled={disableInput}
                value={inputValues.name}
                onChange={handleChange}
              />
            </section>

            <section className="profile__form-section">
              <label htmlFor="email" className="profile__form-label">Почта</label>
              <span className="profile__form-input_error">{errors.email}</span>
              <input
                className={`profile__form-input ${errors.email ? "profile__form-input_type_error" : ""}`}
                type="email"
                name="email"
                required
                disabled={disableInput}
                value={inputValues.email}
                onChange={handleChange}
              />
            </section>
            <p className="profile__error-message">{serverErrorMessage}</p>
            {isEditing
            ? (
              <Button
                type="subbit"
                className="button button_type_blue"
                onClick={handleSubmit}
                disabled={isValid ? false : true}
              >
                {isLoading ? "Сохранение..." : "Сохранить"}
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  className="button button_type_white-text"
                  onClick={handleFormEditing}
                >
                  Редактировать
                  </Button>
                <Link className="profile__signout" to="/" onClick={onSignout}>
                  Выйти из аккаунта
                </Link>
              </>
            )}
          </form>

        </section>
      </main>
    </>
  );
}

export default Profile;
