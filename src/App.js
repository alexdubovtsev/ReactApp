import React, { useRef, useState } from "react"; // Импортируем в каждый файл, где создаем компонент
import ClassCounter from "./Components/ClassCounter";
import Counter from "./Components/Counter";
import Input from "./Components/Input";
import PostList from "./Components/PostList";
import PostItem from "./Components/PostItem";
import PostForm from "./Components/PostForm";
import MySelect from "./Components/UI/select/MySelect";

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
    { id: 1, title: "hJavaScript 1", body: "Description a" },
    { id: 2, title: "vJavaScript 2", body: "Description c" },
    { id: 3, title: "gJavaScript 3", body: "Description b" },
  ]);

  // Делаем обратный вызов (колбэк), тк внутри дочернего компонента мы не имеем доступ к состоянию родительского
  // На вход получаем новый пост, передаваемый в компоненте PostForm
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const [selectedSort, setSelectedSort] = useState("");

  const sortPosts = (sort) => {
    setSelectedSort(sort);
    // Состояния напрямую изменять нельзя, поэтому развернем посты в новый массив и отсортируем его
    setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
  }

  const bodyInputRef = useRef(); // есть единственное поле current - ДОМ-элемент
  // console.log(bodyInputRef.current.value);

  return (
    <div className="App">
      <div className="container">
        <Counter /> {/* Компонент - функция, которая возвращает jsx */}
        <ClassCounter />
        <Input />
        <br />
        <br />
        <PostForm create={createPost} />
        <hr style={{ margin: "15px 0" }} />
        <MySelect
          value={selectedSort}
          // в качестве OnChange будем вызывать sortPorts и передавать то, что приходит из селекта (выбранная пользователем сортировка )
          onChange={sortPosts}
          defaultValue="Sort by"
          options={[
            { value: "title", name: "title" },
            { value: "body", name: "body" },
          ]}
        ></MySelect>
        {/* Условная отрисовка */}
        {posts.length ? (
          <PostList
            remove={removePost}
            posts={posts}
            title={"Список постов про JS"}
          />
        ) : (
          <h1 style={{ textAlign: "center" }}>Посты не найдены</h1>
        )}
      </div>
    </div>
  );
}

export default App;
