import React, { useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PostItem from "./PostItem";

const PostList = ({ posts, title, remove }) => {
  /* Условная отрисовка */
  if (!posts.length) {
    <h1 style={{ textAlign: "center" }}>Посты не найдены</h1>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      {/* Компоненты с пропсами - можно передавать различные данные/парметры извне */}
      {/* <PostItem post={{ id: 1, title: "JavaScript", body: "Description" }} /> */}
      <TransitionGroup>
        {/* Обращаемся к списку постов, вызывая map, и передаем колбек, где каждый объект массива преобразовываем в РЕАКТ-элемент*/}
        {posts.map((post, index) => (
          // для каждого поста отрисовываем item, и как props передаем объект
          // При создании списков нужно указывать ключ с уникальным значением (id используемого (измененного) объекта)
          // Функция remove дальше передаем как пропс
          <CSSTransition
            key={post.id}
            timeout={500}
            classNames="post"
          >
            <PostItem remove={remove} number={index + 1} post={post} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default PostList;
