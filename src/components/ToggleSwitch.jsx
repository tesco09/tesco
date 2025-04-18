import React, { useState } from 'react';

const ToggleSwitch = ({ onChange }) => {
  const [selected, setSelected] = useState('Balance');

  const handleToggle = (value) => {
    setSelected(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="flex border rounded-full bg-gray-200 p-1 w-fit mb-2">
      {['Balance', 'Deposit'].map((option) => (
        <button
          key={option}
          onClick={() => handleToggle(option)}
          className={`px-2 py-1 rounded-full text-sm font-medium transition-all ${
            selected === option
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-300'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ToggleSwitch;
