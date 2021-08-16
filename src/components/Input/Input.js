import React from 'react';

import './Input.css';

function Input({ type, className, name, placeholder, required, disabled, value, onChange }) {
  return (
    <input
      type={type}
      className={className}
      name={name}
      id={name}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      value={value}
      onChange={onChange}
      />
  );
}

export default Input;
