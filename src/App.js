import React, { useRef, useState } from "react"; // Импортируем в каждый файл, где создаем компонент
import ClassCounter from "./Components/ClassCounter";
import Counter from "./Components/Counter";
import Input from "./Components/Input";
import PostItem from "./Components/PostItem";
import PostList from "./Components/PostList";
import MyButton from "./Components/UI/button/MyButton";
import MyInput from "./Components/UI//input/MyInput";

import "./Styles/App.css";

// React использует компонентный подход, вкладываем элементы 1 в другой и создаем сложные интерфейсы
// App - корневой компонент, который монтируется в index.html
// React позволяет больше концентрироваться на логике приложения, на работе с данными (изменяем данные, интерфейс сам подстраивается). Под капотом строится дерево react элементов (более легковесная копия ДОМ-дерева), при изменении элементов строится новое дерево и сравнивается с предыдущим - стадия согласования (отвечает ядро реакта React Core вне зависимости от среды выполнения), затем происходит отрисовка обновленных данных на странице с учетом приоритета (React DOM, React Native)

// npx create-react-app my-app ..OR.. npx create-react-app . - создание проекта из текущей директории
// Собирает конфигурацию, подключает модули, настраивает webPack
// npm start - для запуска

// React хуки - некоторые функции, которые предоставляет реакт (можно юзать в функциональных компонентах или при создании своих хуков). Можно использовать только на верхнем уровне вложенности (НЕ в функциях, циклах, условиях)
// useState - управление состоянием
// useRef - доступ к ДОМ-элементу. Можно получить данные (value) с неуправляемого компонента

function App() {
  // Состояние с массивом постов
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript 1", body: "Description" },
    { id: 2, title: "JavaScript 2", body: "Description" },
    { id: 3, title: "JavaScript 3", body: "Description" },
  ]);

  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  const bodyInputRef = useRef(); // есть единственное поле current - ДОМ-элемент
  // console.log(bodyInputRef.current.value);

  const addNewPost = (e) => {
    e.preventDefault(); // отменяем обновление после нажатия кнопки
    setPosts([...posts, {...post, id: Date.now()}]); // Не изменяем состояние напрямую, а вызываем функцию setPosts и передаем старый массив + новый пост
    // Обнуляем состояния
    setPost({title: "",body: "",})
  };

  return (
    <div className="App">
      <div className="container">
        <Counter /> {/* Компонент - функция, которая возвращает jsx */}
        <ClassCounter />
        <Input />
        <br />
        <form>
          {/* Управляемый компонент */}
          <MyInput
            // Разворачиваем старый пост со всеми полями, но перезаписываем title
            onChange={(e) => setPost({...post, title: e.target.value})}
            value={post.title}
            type="text"
            placeholder="Название поста"
          />
          <MyInput
            onChange={(e) => setPost({...post, body: e.target.value})}
            value={post.body}
            type="text"
            placeholder="Описание поста"
          />
          {/* Неуправляемый компонент */}
          {/* <MyInput ref={bodyInputRef} type="text" placeholder="Описание поста" /> */}
          <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
        <PostList posts={posts} title={"Список постов про JS"} />
      </div>
    </div>
  );
}

export default App;
