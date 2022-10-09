import React from "react";

// Классовый компонент
class ClassCounter extends React.Component {
  // Наследуемся от Компонентов Реакт
  // Нужно реализовать функцию рендер, которая будет возвращать jsx

  constructor(props) {
    super(props);
    this.state = {
      // инициализируем состояние, создав в зарезервированном свойстве state поле count
      count: 0,
    };
    // Контекст компонента теряется, его надо явно забиндить в функции
    this.Increment = this.Increment.bind(this);
    this.Decrement = this.Decrement.bind(this);
  }

  Increment() {
    // Изменять состояния напрямую не можем, РЕАКТ не увидит изменения, поэтому вызываем setState и передаем новое состояние с измененными значениями
    this.setState({ count: this.state.count + 1 });
  }

  Decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return (
      <div>
        <p>Классовый компонент</p>
        <h1>{this.state.count}</h1>
        <button onClick={this.Increment}>Incr</button>
        <button onClick={this.Decrement}>Decr</button>
      </div>
    );
  }
}

export default ClassCounter;
