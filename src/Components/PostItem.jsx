import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";

const PostItem = (props) => {
  // Компонент может принимать входные данные - props

  return (
    // Структура элемента post - выделяется в отдельный компонент
    <div className="post">
      <div className="post__content">
        <strong>
          {props.number}. {props.post.title}
        </strong>
        <div>{props.post.body}</div>
      </div>
      <div className="btns">
        <MyButton onClick={() => props.remove(props.post)} className="btn">
          Delete post
        </MyButton>
      </div>
    </div>
  );
};

export default PostItem;
