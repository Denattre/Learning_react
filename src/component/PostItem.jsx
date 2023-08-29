import React from "react";
import MyButton from "./UI/Button/MyButton";
import { useNavigate } from "react-router-dom";

const PostItem = (props) => {
  const navigate = useNavigate();

  return (
    <div className="post">
      <div className="post-content">
        <h1 className="post-title">
          {props.post.title} № {props.post.id}
        </h1>
        <div className="post-description">{props.post.body}</div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => navigate(`/posts/${props.post.id}`)}>
          Открыть
        </MyButton>
        <MyButton onClick={() => props.deletePost(props.post)}>
          Удалить
        </MyButton>
      </div>
    </div>
  );
};

export default PostItem;
