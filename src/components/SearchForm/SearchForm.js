import React, { useEffect } from 'react';
import './SearchForm.css'

import Button from '../Button/Button';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useFormValidation } from '../../hooks/useForm';

function SearchForm({ handleSearch }) {

  const { inputValues, handleChange, resetFrom, errors, isValid } =
    useFormValidation();
  //-----------------------------------

  // Сброс полей формы
  useEffect(() => {
    resetFrom();
  }, [resetFrom]);

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch(inputValues.searchInput)
  };

  return (
    <section className="search">
        <form
          className="search-form"
          method="GET"
          onSubmit={handleSubmit}
        >
          <div className="search-form__main">
            <input
              className="search-form__input"
              type="text"
              name="searchInput"
              placeholder="Фильм"
              value={inputValues.searchInput}
              onChange={handleChange}
            />
            <Button className="button button_type_seach" type="submit">Найти</Button>
          </div>
          <FilterCheckbox/>
        </form>
    </section>
  );
}

export default SearchForm;
