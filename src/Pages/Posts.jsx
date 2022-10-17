import React, { useRef, useState, useEffect } from "react"; // Импортируем в каждый файл, где создаем компонент

import ClassCounter from "../Components/ClassCounter";
import Counter from "../Components/Counter";
import Input from "../Components/Input";
import PostList from "../Components/PostList";
import PostForm from "../Components/PostForm";
import PostFilter from "../Components/PostFilter";
import MyModal from "../Components/UI/MyModal/MyModal";
import MyButton from "../Components/UI/button/MyButton";
import MyPagination from "../Components/UI/pagination/MyPagination";
import Loader from "../Components/UI/Loader/Loader";

import PostService from "../API/PostService";
import { usePosts } from "../Hooks/usePosts.js";
import { useFetching } from "../Hooks/useFetching";
import { getPageCount } from "../Utils/pages";

// ! Сделать массив страниц с использоваем useMemo (пересчитывать массив при изменении общего количества страниц) Сделать хук usePagination, который заполняет массив

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

function Posts() {
  // Состояние с массивом постов
  const [posts, setPosts] = useState([]);

  const [modal, setModal] = useState(false);

  const [filter, setFilter] = useState({
    sort: "",
    query: "",
  });

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  // Изменение состояний - асинхронный процесс (для чего это? - например, вызывается несколько функций, изменяются состояния, это вызывает изменение каких-то дочерних компонентов, поэтмоу в целях оптимизации РЕАКТ применяет эти изменения разом, чтобы избежать повторных манипуляций с ДОМ)

  // Функция, которая отправляет запрос на сервер, получать данные и помещать их в состояния с постами
  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      // сюда помещаем результат выполнения запроса
      const response = await PostService.getAll(limit, page);
      setPosts(response.data);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  // Делаем обратный вызов (колбэк), тк внутри дочернего компонента мы не имеем доступ к состоянию родительского
  // На вход получаем новый пост, передаваемый в компоненте PostForm
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  useEffect(() => {
    fetchPosts(limit, page);
  }, []);

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  // Функция изменяет номер страницы, и с измененным номером страницы подгружать новую порцию данных
  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page);
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
        {postError && <h1>Error ${postError}</h1>}
        {isPostsLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <Loader />
          </div>
        ) : (
          <PostList
            remove={removePost}
            posts={sortedAndSearchedPosts}
            title={"Список постов про JS"}
          />
        )}
        <MyPagination
          page={page}
          totalPages={totalPages}
          changePage={changePage}
        />
      </div>
    </div>
  );
}

export default Posts;
