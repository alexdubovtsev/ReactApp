import React, { useRef, useState, useMemo } from "react"; // Импортируем в каждый файл, где создаем компонент
import ClassCounter from "./Components/ClassCounter";
import Counter from "./Components/Counter";
import Input from "./Components/Input";
import PostList from "./Components/PostList";
import PostItem from "./Components/PostItem";
import PostForm from "./Components/PostForm";
import MySelect from "./Components/UI/select/MySelect";
import MyInput from "./Components/UI//input/MyInput";
import PostFilter from "./Components/PostFilter";
import MyModal from "./Components/UI/MyModal/MyModal";
import MyButton from "./Components/UI/button/MyButton";

import { usePosts } from "./Hooks/usePosts.js";
import "./Styles/App.css";

// npm install react-transition-group --save - библиотека для анимаций (https://reactcommunity.org/react-transition-group/transition-group)

// React использует компонентный подход, вкладываем элементы 1 в другой и создаем сложные интерфейсы
// App - корневой компонент, который монтируется в index.html
// React позволяет больше концентрироваться на логике приложения, на работе с данными (изменяем данные, интерфейс сам подстраивается). Под капотом строится дерево react элементов (более легковесная копия ДОМ-дерева), при изменении элементов строится новое дерево и сравнивается с предыдущим - стадия согласования (отвечает ядро реакта React Core вне зависимости от среды выполнения), затем происходит отрисовка обновленных данных на странице с учетом приоритета (React DOM, React Native)

// npx create-react-app my-app ..OR.. npx create-react-app . - создание проекта из текущей директории
// Собирает конфигурацию, подключает модули, настраивает webPack
// npm start - для запуска

// React хуки - некоторые функции, которые предоставляет реакт (можно юзать в функциональных компонентах или при создании своих хуков). Можно использовать только на верхнем уровне вложенности (НЕ в функциях, циклах, условиях)
// useState - управление состоянием
// useRef - доступ к ДОМ-элементу. Можно получить данные (value) с неуправляемого компонента
// useMemo(callback, deps) - принимает колбэк и массив зависимостей. Колбэк должен возвращать результат вычислений(отсортированный или отфильтрованный массив). В массив зависимостей можнло передавать переменные, поля объекта. Данная функция производит вычисленияЮ запоминает результат и кэширует (такое поведение называется мемоизация). Если зависимость изменилась (например, выбрали другой алгоритм сортировки), функция пересчитывает и кэширует результат до тех пор, пока 1 из зависимостей не изменится. Если зависимсотей нет, функция отработает 1 раз и запомнит результат.

function App() {
  // Состояние с массивом постов
  const [posts, setPosts] = useState([
    { id: 1, title: "hJavaScript 1", body: "Description a" },
    { id: 2, title: "vJavaScript 2", body: "Description c" },
    { id: 3, title: "gJavaScript 3", body: "Description b" },
  ]);

  const [modal, setModal] = useState(false);

  const [filter, setFilter] = useState({
    sort: "",
    query: "",
  });

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  // Делаем обратный вызов (колбэк), тк внутри дочернего компонента мы не имеем доступ к состоянию родительского
  // На вход получаем новый пост, передаваемый в компоненте PostForm
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const bodyInputRef = useRef(); // есть единственное поле current - ДОМ-элемент
  // console.log(bodyInputRef.current.value);

  return (
    <div className="App">
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <div className="container">
        <Counter /> {/* Компонент - функция, которая возвращает jsx */}
        <ClassCounter />
        <Input />
        <br />
        <br />
        <hr style={{ margin: "15px 0" }} />
        <MyButton onClick={() => setModal(true)}>Add post</MyButton>
        <PostFilter filter={filter} setFilter={setFilter} />
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title={"Список постов про JS"}
        />
      </div>
    </div>
  );
}

export default App;
