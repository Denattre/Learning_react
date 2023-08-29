import React from "react";
import MyInput from "../component/UI/Input/MyInput";
import MyButton from "../component/UI/Button/MyButton";

export default function Login() {
  return (
    <div>
      <h1>Страница авторизации</h1>
      <form>
        <MyInput type="text" placeholder="Введите логин" />
        <MyInput type="password" placeholder="Введите пароль" />
        <MyButton>Войти</MyButton>
      </form>
    </div>
  );
}
