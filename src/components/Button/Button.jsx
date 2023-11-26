import React from 'react';
import {} from './Button.css';

const Button = ({ onClick, children }) => {
  return (
    <button className="loadmore" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
