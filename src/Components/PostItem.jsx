import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import { useNavigate } from "react-router-dom";

// Компонент может принимать входные данные - props
const PostItem = (props) => {
  // Переход между страницами можно осуществлять без Link С помощью спец. объекта useHistory. Он содержит ряд функций и свойств. Location показывает текущий путь, Push переходит на конкретную страницу без использования ссылок(при нажатии на кнопку или при другом событии)
  const navigate = useNavigate();
  return (
    // Структура элемента post - выделяется в отдельный компонент
    <div className="post">
      <div className="post__content">
        <strong>
          {props.post.id}. {props.post.title}
        </strong>
        <div>{props.post.body}</div>
      </div>
      <div className="post__btns">
        {/* Путь будет формироваться динамически в зависимости от id поста */}
        <MyButton onClick={() => navigate(`/posts/${props.post.id}`)}>Open post</MyButton>
        <MyButton onClick={() => props.remove(props.post)}>
          Delete post
        </MyButton>
      </div>
    </div>
  );
};

export default PostItem;
