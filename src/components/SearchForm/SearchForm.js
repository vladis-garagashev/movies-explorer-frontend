import React from 'react';
import './SearchForm.css'

import Button from '../Button/Button';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Input from '../Input/Input';

function SearchForm(props) {
  return (
    <section className="search">
        <form
          className="search-form"
          method="GET"
          onSubmit={(e) => e.preventDefault()} // Временно!
        >
          <div className="search-form__main">
            <Input
              className="search-form__input"
              type="text"
              name="movies"
              placeholder="Фильм"
            />
            <Button className="button button_type_seach" type="submit">Найти</Button>
          </div>
          <FilterCheckbox/>
        </form>
    </section>
  );
}

export default SearchForm;
