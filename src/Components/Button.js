import React from 'react';

const Button = ({ type, title, variant, full }) => {
  return (
    <button
      className={`flexCenter gap-3 rounded-full border ${variant} ${full ? 'w-full' : ''}`}
      type={type}
    >
      
      <label className="bold-16 whitespace-nowrap cursor-pointer">{title}</label>
    </button>
  );
}

export default Button;
