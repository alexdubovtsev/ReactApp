import React, { useState } from "react";
const PostItem = (props) => {
  // Компонент может принимать входные данные - props

  return (
    // Структура элемента post - выделяется в отдельный компонент
    <div className="post">
      <div className="post__content">
        <strong>
          {props.post.id}. {props.post.title}
        </strong>
        <div>{props.post.body}</div>
      </div>
      <div className="btns">
        <button className="btn">Delete post</button>
      </div>
    </div>
  );
};

export default PostItem;
