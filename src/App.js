import React, { useState } from "react"; // Импортируем в каждый файл, где создаем компонент
import ClassCounter from "./Components/ClassCounter";
import Counter from "./Components/Counter";
import Input from "./Components/Input";


// React использует компонентный подход, вкладываем элементы 1 в другой и создаем сложные интерфейсы
// App - корневой компонент, который монтируется в index.html
// React позволяет больше концентрироваться на логике приложения, на работе с данными (изменяем данные, интерфейс сам подстраивается). Под капотом строится дерево react элементов (более легковесная копия ДОМ-дерева), при изменении элементов строится новое дерево и сравнивается с предыдущим - стадия согласования (отвечает ядро реакта React Core вне зависимости от среды выполнения), затем происходит отрисовка обновленных данных на странице с учетом приоритета (React DOM, React Native)

// npx create-react-app my-app ..OR.. npx create-react-app . - создание проекта из текущей директории
// Собирает конфигурацию, подключает модули, настраивает webPack
// npm start - для запуска




function App() {
  
  return (
    <div className="App">
      <Counter/>  {/* Компонент - функция, которая возвращает jsx */}
      <ClassCounter/>
      <Input/>
    </div>
  );
}

export default App;
