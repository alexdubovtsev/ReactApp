import React, { useState } from "react";

const MySelect = ({ options, defaultValue, value, onChange }) => {
  return (
    // Реализуем Двустороннее связывание и сделаем компонент управляемым: OnChange - чтобы следить за изменением значения внутри селекта
    <select value={value} onChange={(event) => onChange(event.target.value)}>

      {/* передаем не сам ивент, а выбранное значение */}
      <option disabled value="">
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default MySelect;
