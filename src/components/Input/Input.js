import React from 'react';

import './Input.css';

function Input({
  type,
  className,
  name,
  placeholder,
  required,
  disabled,
  value,
  onChange,
  minLength,
  maxLength,

 }) {
  return (
    <input
      type={type}
      className={className}
      name={name}
      id={name}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      required={required}
      disabled={disabled}
      value={value}
      onChange={onChange}
      />
  );
}

export default Input;
