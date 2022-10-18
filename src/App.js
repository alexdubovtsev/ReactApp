import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Components/AppRouter";
import Navbar from "./Components/UI/Navbar/Navbar";
import { AuthContext } from "./Context";
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

// todo React хуки - некоторые функции, которые предоставляет реакт (можно юзать в функциональных компонентах или при создании своих хуков). Можно использовать только на верхнем уровне вложенности (НЕ в функциях, циклах, условиях)
// * useState - управление состоянием

// *useRef - доступ к ДОМ-элементу. Можно получить данные (value) с неуправляемого компонента

// *useMemo(callback, deps) - принимает колбэк и массив зависимостей. Колбэк должен возвращать результат вычислений(отсортированный или отфильтрованный массив). В массив зависимостей можнло передавать переменные, поля объекта. Данная функция производит вычисленияЮ запоминает результат и кэширует (такое поведение называется мемоизация). Если зависимость изменилась (например, выбрали другой алгоритм сортировки), функция пересчитывает и кэширует результат до тех пор, пока 1 из зависимостей не изменится. Если зависимсотей нет, функция отработает 1 раз и запомнит результат.

// *useEffect(callback, deps) - Каждый компонент обладает своим жизненным циклом, который проходит в 3 этапа:
// 1) При создании компонента происходит МОНТИРОВАНИЕ его в ДОМ-дерево. Интересно в том случае, когда хотим первично подгрузить данные, повесить слушатель события, отправить запрос на сервер
// 2) ОБНОВЛЕНИЕ - изменили состояние - перерисовка. Можем следить за изменением зависимостей и делать нужные действия.
// 3) РАЗМОНТИРОВАНИЕ - удаление компонента за ненадобностью (отписываемся от слушателя события, очищаем глобальное хранилище)
// За этими стадиями следит хук useEffect(callback, deps) (1 хук следит за изменениями одних данных, другой за изменениями дугих, третий може отрабатывать при первичной отрисовке).
// Если массив зависимостей пустой, калбэк отработает единожды в момент монтирования (как здесь отрисовать список постов с сервера). Чтобы следить за изменениями, надо добавить зависимости. Если калбэк возвращает функцию (очистки, отписывания от событий и т.д.), она будет вызвана в момент демонтирования компонента

// useContext(context) - с помощью контекста можно создать глобальное хранилище и обращаться к нему из любого компонента на любом уровне вложенности

function App() {

  const [isAuth, setIsAuth] = useState(false);
  // Индикация, закончился запрос на авторизацию или нет
  const [isLoading, setIsLoading] = useState(true);

  // Проверка на авторизованность (при первом запуске приложения)
  useEffect(() => {
    // из localStorage получаем значение по ключу auth
    if(localStorage.getItem('auth')) {
      setIsAuth(true)
    }
    setIsLoading(false);
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        setIsLoading,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
