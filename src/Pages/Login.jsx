import React, { useState } from "react";
import MyButton from "../Components/UI/button/MyButton";
import MyInput from "../Components/UI/input/MyInput";
const Login = () => {

  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <MyInput type="text" placeholder="Login"/>
        <MyInput type="password" placeholder="Password"/>
        <MyButton>Login</MyButton>
      </form>
    </div>
  )}

export default Login;