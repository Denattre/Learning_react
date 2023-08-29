import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import MyLoader from "../component/UI/Loader/MyLoader";

export default function PostIdPage() {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([{}]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchComments, isCommentsLoading, commentsError] = useFetching(
    async (id) => {
      const response = await PostService.getComments(id);
      setComments(response.data);
    }
  );
  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);
  return (
    <div>
      <h1>Страница поста №{params.id}</h1>
      {isLoading ? (
        <MyLoader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      <h1>Комментарии:</h1>
      {isCommentsLoading ? (
        <MyLoader />
      ) : (
        <div>
          {comments.map((comment) => {
            return (
              <div key={comment.id} style={{ marginTop: 15 }}>
                <h5>{comment.email}</h5>
                <div>{comment.body}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
