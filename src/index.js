import { type } from '@testing-library/user-event/dist/type';
import React from 'react';
import ReactDOM from 'react-dom/client'; // Ядро реакта, чтобы вмонтировать компонент в приложение
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root')); // Блок, в который будет монтироваться компонент
root.render( // Передаем компонент, который хотим отрисовать
  <App/>,

  // React.createElement('button', { // Элемент, опции, содержимое
  //   //disabled: true,
  //   onClick: () => console.log('CLICK'),
  // }, 'Нажми на меня!'),
  // Но можно использовать формат JSX, который похож на HTML, но внутри JS

);


