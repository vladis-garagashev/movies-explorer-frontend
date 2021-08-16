import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../Button/Button';
import './PageNotFound.css'

function PageNotFound() {

  const history = useHistory();

  const handleClick = () => {
    history.goBack()
  }

  return (
    <div className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <Button
        className="button button_type_blue-text"
        type="button"
        onClick={handleClick}
      >
        Назад
      </Button>
    </div>
  );
}

export default PageNotFound;
