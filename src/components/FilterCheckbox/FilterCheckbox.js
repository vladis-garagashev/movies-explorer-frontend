import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import './FilterCheckbox.css'

function FilterCheckbox() {
  const { handleFilterMovies } = useContext(AppContext);

  return (
    <div className="checkbox">
      <p className="checkbox__name">Короткометражки</p>
      <label className="checkbox__label" htmlFor="short-movies">
        <input type="checkbox" className="checkbox__hidden" name="short-movies" id="short-movies"/>
        <span className="checkbox__pseudo" onClick={handleFilterMovies}></span>
      </label>
    </div>
  );
}

export default FilterCheckbox;
