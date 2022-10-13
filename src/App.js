import React, { useRef, useState, useMemo, useEffect } from "react"; // Импортируем в каждый файл, где создаем компонент
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
import axios from "axios";

// npm install react-transition-group --save - библиотека для анимаций (https://reactcommunity.org/react-transition-group/transition-group)

// npm i axios - библиотека, с помощью которой можно делать запросы

// React использует компонентный подход, вкладываем элементы 1 в другой и создаем сложные интерфейсы
// App - корневой компонент, который монтируется в index.html
// React позволяет больше концентрироваться на логике приложения, на работе с данными (изменяем данные, интерфейс сам подстраивается). Под капотом строится дерево react элементов (более легковесная копия ДОМ-дерева), при изменении элементов строится новое дерево и сравнивается с предыдущим - стадия согласования (отвечает ядро реакта React Core вне зависимости от среды выполнения), затем происходит отрисовка обновленных данных на странице с учетом приоритета (React DOM, React Native)

// npx create-react-app my-app ..OR.. npx create-react-app . - создание проекта из текущей директории
// Собирает конфигурацию, подключает модули, настраивает webPack
// npm start - для запуска

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

function App() {
  // Состояние с массивом постов
  const [posts, setPosts] = useState([]);

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

  useEffect(() => {
    fetchPosts();
  }, []);

  // Функция, которая отправляет запрос на сервер, получать данные и помещать их в состояния с постами
  async function fetchPosts() {
    // сюда помещаем результат выполнения запроса
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setPosts(response.data);
  }

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
        <button onClick={fetchPosts}>GET POST</button>
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
