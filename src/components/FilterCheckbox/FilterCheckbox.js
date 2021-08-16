import React from 'react';
import './FilterCheckbox.css'

function FilterCheckbox() {

  return (
    <div className="checkbox">
      <p className="checkbox__name">Короткометражки</p>
      <label className="checkbox__label" htmlFor="short-movies">
        <input type="checkbox" className="checkbox__hidden" name="short-movies" id="short-movies"/>
        <span className="checkbox__pseudo"></span>
      </label>
    </div>
  );
}

export default FilterCheckbox;
