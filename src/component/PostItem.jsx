import React from "react";
import MyButton from "./UI/Button/MyButton";

const PostItem = (props) => {
  return (
    <div className="post">
      <div className="post-content">
        <h1 className="post-title">
          {props.post.title} № {props.post.id}
        </h1>
        <div className="post-description">{props.post.body}</div>
      </div>
      <div className="post-btns">
        <MyButton onClick={() => props.deletePost(props.post)}>
          Удалить
        </MyButton>
      </div>
    </div>
  );
};

export default PostItem;
