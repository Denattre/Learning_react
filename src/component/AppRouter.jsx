import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";

export default function AppRouter() {
  const isAuth = false;
  return isAuth ? (
    <Routes>
      <Route path="/about" element={<About />}></Route>
      <Route path="/posts" element={<Posts />}></Route>
      <Route path="/posts/:id" element={<PostIdPage />}></Route>
      <Route path="*" element={<Error />}></Route>
    </Routes>
  ) : (
    <Routes>
      <Route path="/*" element={<Login />}></Route>
    </Routes>
  );
}
