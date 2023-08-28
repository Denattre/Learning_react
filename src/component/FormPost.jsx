import React, { useState } from "react";
import MyButton from "./UI/Button/MyButton";
import MyInput from "./UI/Input/MyInput";

export default function FormPost({ create }) {
  const [newPost, setNewPost] = useState({
    id: "",
    title: "",
    body: "",
  });
  const addNewPost = (e) => {
    e.preventDefault();
    const post = {
      ...newPost,
      id: Date.now(),
    };
    create(post);
    setNewPost({ id: "", title: "", body: "" });
  };

  return (
    <form>
      <MyInput
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        type="text"
        placeholder="Название поста"
      />
      <MyInput
        value={newPost.body}
        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        type="text"
        placeholder="Описание поста"
      />
      <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
  );
}
