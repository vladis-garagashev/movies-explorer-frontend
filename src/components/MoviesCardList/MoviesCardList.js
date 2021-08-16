import React from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';

function MoviesCardList({ saved }) {
  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        {saved // Временно!
        ? (
          <>
            <MoviesCard btnClassName="button button_type_delete-movie"/>
            <MoviesCard btnClassName="button button_type_delete-movie"/>
            <MoviesCard btnClassName="button button_type_delete-movie"/>
            <MoviesCard btnClassName="button button_type_delete-movie"/>
            <MoviesCard btnClassName="button button_type_delete-movie"/>
          </>
        ) : (
          <>
            <MoviesCard btnClassName="button button_type_saved-movie"/>
            <MoviesCard btnClassName="button button_type_save-movie" btnTitle="Сохранить"/>
            <MoviesCard btnClassName="button button_type_save-movie" btnTitle="Сохранить"/>
            <MoviesCard btnClassName="button button_type_saved-movie"/>
            <MoviesCard btnClassName="button button_type_save-movie" btnTitle="Сохранить"/>
          </>
        )}
      </ul>
      {!saved && <Button className="button button_type_load-more" type="button">Ещё</Button>}
    </section>
  );
}

export default MoviesCardList;
