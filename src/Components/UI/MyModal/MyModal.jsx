import React, { useState } from "react";
import classes from "./MyModal.module.css";

// Сам компонент не может регулировать видимость, этим будет управлять родительский компонент, в котором модалка используется. Пропсами будем ожидать visible,который будет отвечать, видно модальку или нет,  ф функция setVisible, которая будет скрывать окно при нажатии на темную область
const MyModal = ({ children, visible, setVisible }) => {
  const rootClasses = [classes.MyModal];
  if (visible) {
    rootClasses.push(classes._active);
  }

  return (
    // Вернем с помощью join строку из 2 классов
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div
        className={classes.MyModalContent}
        // Предотвращзаем всплытие события, чтобы при нажатии на само окно, модалка не закрывалась
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default MyModal;
