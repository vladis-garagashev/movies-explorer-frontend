import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormValidation } from '../../hooks/useForm';
import Button from '../Button/Button';
import Header from '../Header/Header';
import Input from '../Input/Input';
import './Profile.css'

function Profile({ isEditing, handleFormEditing, currentUser}) {
  const { inputValues, handleChange, resetFrom } = useFormValidation();

  const disableInput = isEditing ? false : true;

  useEffect(() => {
    if (currentUser) {
      resetFrom(currentUser, {}, true);
    }
  }, [currentUser, resetFrom]);
  //-----------------------------------

  // Обработчик сабмита формы
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleFormEditing()
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
              <Input
                className="profile__form-input"
                type="text"
                name="name"
                required={true}
                disabled={disableInput}
                value={inputValues.name}
                onChange={handleChange}
              />
            </section>

            <section className="profile__form-section">
              <label htmlFor="email" className="profile__form-label">Почта</label>
              <Input
                className="profile__form-input"
                type="email"
                name="email"
                required={true}
                disabled={disableInput}
                value={inputValues.email}
                onChange={handleChange}
              />
            </section>
            {isEditing
            ? (
              <Button
                type="subbit"
                className="button button_type_blue"
                onClick={handleSubmit}
              >
                Сохранить
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
                <Link className="profile__signout" to="/">Выйти из аккаунта</Link>
              </>
            )}
          </form>

        </section>
      </main>
    </>
  );
}

export default Profile;
