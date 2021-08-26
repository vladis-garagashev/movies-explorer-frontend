import React from 'react';
import './Button.css'

function Button({ className, type, onClick, disabled, children }) {
  const btnClassName = `${className} ${disabled ? "button_type_disabled": ""}`
  return (
    <button className={btnClassName} type={type} onClick={onClick} disabled={disabled}>{children}</button>
  );
}

export default Button;
