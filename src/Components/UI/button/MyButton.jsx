import React, { useState } from "react";
// Импортируем некоторый объект из файла. CSS-модуль позволяет генерировать уникальное название
import classes from './MyButton.module.css';

const MyButton = ({children, ...props}) => {

  return (
    // стиль как свойство объекта
    // объект пропсов разворачиваем в кнопку (все пропсы в компоненте кнопки будут в нее улетать)
    <button {...props} className={classes.myBtn}> 
      {children} {/* вложенный элемент (Создать пост) */}
    </button>
  )}

export default MyButton;