import React, { useContext } from "react";
import MyButton from "../Components/UI/button/MyButton";
import MyInput from "../Components/UI/input/MyInput";
import { AuthContext } from "../Context";

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const login = (event) => {
    event.preventDefault();
    setIsAuth(true);
    // Сохраняем строку true в поле auth в localStorage
    localStorage.setItem('auth', 'true');
  };
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Login" />
        <MyInput type="password" placeholder="Password" />
        <MyButton>Login</MyButton>
      </form>
    </div>
  );
};

export default Login;
