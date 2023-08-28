import React, { useState } from "react";
import PostItem from "./PostItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function PostsList({ posts, title, deletePost }) {
  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>Посты не найдены!</h1>;
  }
  return (
    <div>
      <h1>{title}</h1>
      <TransitionGroup>
        {posts.map((post) => (
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <PostItem deletePost={deletePost} post={post} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
