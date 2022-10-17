import React from "react";
import { BrowserRouter, Route, Routes, Link, Switch, Redirect } from "react-router-dom";
import Navbar from "./Components/UI/Navbar/Navbar";
import About from "./Pages/About";
import NotFound from "./Pages/NotFound";
import Posts from "./Pages/Posts";
import "./Styles/App.css";

// npx create-react-app my-app ..OR.. npx create-react-app . - создание проекта из текущей директории
// Собирает конфигурацию, подключает модули, настраивает webPack
// npm start - для запуска

// npm install react-transition-group --save - библиотека для анимаций (https://reactcommunity.org/react-transition-group/transition-group)

// npm i axios - библиотека, с помощью которой можно делать запросы

// https://v5.reactrouter.com/web/guides/quick-start - библиотека для управления роутингом в браузере. Все приложение нужно обернуть в BrowserRouter(он будет отслеживать изменение пути и перерисовывать компоненты). Чтоб объявить какой-то маршрут или страницу, нужно использовать компонент Route. ЧТобы ссылки не обновлялись, используем вместо a <Link>. Routes позволяет группировать маршруты и выбрать хотя бы 1 из тех, что есть внутри (можно добавить страницу с сообщением об ошибке).

// React использует компонентный подход, вкладываем элементы 1 в другой и создаем сложные интерфейсы
// App - корневой компонент, который монтируется в index.html
// React позволяет больше концентрироваться на логике приложения, на работе с данными (изменяем данные, интерфейс сам подстраивается). Под капотом строится дерево react элементов (более легковесная копия ДОМ-дерева), при изменении элементов строится новое дерево и сравнивается с предыдущим - стадия согласования (отвечает ядро реакта React Core вне зависимости от среды выполнения), затем происходит отрисовка обновленных данных на странице с учетом приоритета (React DOM, React Native)

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        {/* Если ничего не найдено, отрисуем NotFoundPage*/}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
