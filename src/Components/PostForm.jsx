import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI//input/MyInput";

const PostForm = ({ create }) => {
  
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  // Пропсы передаются сверху вниз от Родителя к Ребенку, поэтому от родителя передадим функцию-колбэк. На вход принимается пост, который добавляется в массив. Функция вызовется в дочернем компоненте, и пост попадет в массив
  const addNewPost = (e) => {
    e.preventDefault(); // отменяем обновление после нажатия кнопки
    // setPosts([...posts, { ...post, id: Date.now() }]); // Не изменяем состояние напрямую, а вызываем функцию setPosts и передаем старый массив + новый пост

    const newPost = {
      ...post,
      id: Date.now(),
    };
    create(newPost);
    // Обнуляем состояния
    setPost({ title: "", body: "" });
  };

  return (
    <form>
      {/* Управляемый компонент */}
      <MyInput
        // Разворачиваем старый пост со всеми полями, но перезаписываем title
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        value={post.title}
        type="text"
        placeholder="Название поста"
      />
      <MyInput
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        value={post.body}
        type="text"
        placeholder="Описание поста"
      />
      {/* Неуправляемый компонент */}
      {/* <MyInput ref={bodyInputRef} type="text" placeholder="Описание поста" /> */}
      <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
  );
};

export default PostForm;
