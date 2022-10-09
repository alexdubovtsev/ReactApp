import React, { useState } from "react";

const Input = function () {
  const [value, setValue] = useState("INPUT TEXT");

  return (
    <div>
      <h1>{value}</h1>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)} // Колбеки для событий принимают event, теперь добились синхронизации состояния и значения в инпуте
      />
    </div>
  );
};

export default Input;
