import React from 'react';

const ToggleBtn = ({ handleChange, isChecked }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        onChange={handleChange}
        checked={isChecked}
      />
      <span
        className={`relative inline-block w-12 h-6 rounded-full transition-colors ${
          isChecked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform transform ${
            isChecked ? 'translate-x-6' : 'translate-x-0'
          }`}
        ></span>
      </span>
    </label>
  );
};

export default ToggleBtn;
