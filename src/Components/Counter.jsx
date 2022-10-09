import React, { Component, useState } from "react";

// Функциональный компонент
const Counter = function () {
  // При изменении React не понимает что в конкретном компоненте произошли эти изменения, для этого придуманы состояния, которые позволяют перерисовать компонент
  const [count, setCount] = useState(0); // Параметр - значение по умолчанию
  // массив 2 элементов: значение и функция, которая изменяет состояния (т.е. мы явно указываем, что в компоненте произошли изменения)

  function Increment() {
    setCount(count + 1);
  }

  function Decrement() {
    setCount(count - 1);
  }
  // Реакт понимает, что состояния изменились, и перерисовыает компонент


  return (
    <div>
      <p>Функциональный компонент</p>
      <h1>{count}</h1>
      {/* Не вызваем функции, а передаем как ссылку  */}
      <button onClick={Increment}>Incr</button>
      <button onClick={Decrement}>Decr</button>
    </div>
  );
};

export default Counter;
