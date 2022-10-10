import React, { useState } from "react";
import PostItem from "./PostItem";

const PostList = ({posts, title}) => {

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      {/* Компоненты с пропсами - можно передавать различные данные*/}
      {/* <PostItem post={{ id: 1, title: "JavaScript", body: "Description" }} /> */}
      
      {/* Обращаемся к списку постов, вызывая map, и передаем колбек, где каждый объект массива преобразовываем в РЕАКТ-элемент*/}
      {posts.map((post) => (
        // для каждого поста отрисовываем item, и как props передаем объект
        // При создании списков нужно указывать ключ с уникальным значением (id используемого (измененного) объекта)
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
