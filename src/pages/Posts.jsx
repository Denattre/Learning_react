import React, { useState, useEffect } from "react";
import PostsList from "../component/PostsList";
import FormPost from "../component/FormPost";
import PostFilter from "../component/PostFilter";
import MyModal from "../component/UI/Modal/MyModal";
import MyButton from "../component/UI/Button/MyButton";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostService";
import MyLoader from "../component/UI/Loader/MyLoader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import Pagination from "../component/UI/Pagination/Pagination";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const deletePost = (post) => {
    setPosts(
      posts.filter((el) => {
        return el.id !== post.id;
      })
    );
  };

  return (
    <div className="App">
      {/* <Counter />
      <ClassCounter /> */}
      <MyButton
        style={{ marginTop: "30px" }}
        onClick={() => {
          setModal(true);
        }}
      >
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <FormPost create={createPost}></FormPost>
      </MyModal>
      <hr style={{ margin: "15px 0" }}></hr>
      <PostFilter filter={filter} setFilter={setFilter} />
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
      {postError && <h1>Произошла ошибка ${postError} </h1>}
      {isPostsLoading ? (
        <div style={{ display: "flex", justifyContent: "center " }}>
          <MyLoader />
        </div>
      ) : (
        <PostsList
          deletePost={deletePost}
          posts={sortedAndSearchedPosts}
          title="Список постов №1"
        />
      )}
    </div>
  );
}

export default Posts;
