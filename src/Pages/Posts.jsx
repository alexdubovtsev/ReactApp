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
import { useObserver } from "../Hooks/useObserver";
import MySelect from "../Components/UI/select/MySelect";

// ! Сделать массив страниц с использоваем useMemo (пересчитывать массив при изменении общего количества страниц) Сделать хук usePagination, который заполняет массив

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
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  // ССлыка на ДОМ-элемент, который последний в списке. Когда он появится в зоне видимости окна, будем подгружать новые данные
  const lastElement = useRef();

  // Изменение состояний - асинхронный процесс (для чего это? - например, вызывается несколько функций, изменяются состояния, это вызывает изменение каких-то дочерних компонентов, поэтмоу в целях оптимизации РЕАКТ применяет эти изменения разом, чтобы избежать повторных манипуляций с ДОМ)

  // Функция, которая отправляет запрос на сервер, получать данные и помещать их в состояния с постами
  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      // сюда помещаем результат выполнения запроса
      const response = await PostService.getAll(limit, page);
      // создаем массив, добавляем старые посты и те, что с сервера в конец страницы
      setPosts([...posts, ...response.data]);
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

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  // Функция изменяет номер страницы, и с измененным номером страницы подгружать новую порцию данных
  const changePage = (page) => {
    setPage(page);
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
        <MySelect
          value={limit}
          onChange={(value) => setLimit(value)}
          defaultValue="Elements on page"
          options={[
            {
              value: 5,
              name: "5",
            },
            {
              value: 15,
              name: "15",
            },
            {
              value: 25,
              name: "25",
            },
            {
              value: -1,
              name: "Show all",
            },
          ]}
        />
        {postError && <h1>Error ${postError}</h1>}
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title={"Список постов про JS"}
        />
        <div ref={lastElement} style={{ height: 20, background: "red" }} />
        {isPostsLoading && (
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
          >
            <Loader />
          </div>
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
