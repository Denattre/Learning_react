import React, { useState, useEffect, useRef } from "react";
import PostsList from "../component/PostsList";
import FormPost from "../component/FormPost";
import PostFilter from "../component/PostFilter";
import MyModal from "../component/UI/Modal/MyModal";
import MyButton from "../component/UI/Button/MyButton";
import MySelect from "../component/UI/Select/MySelect";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostService";
import MyLoader from "../component/UI/Loader/MyLoader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import Pagination from "../component/UI/Pagination/Pagination";
import { useObserver } from "../hooks/useObserver";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(page, limit);
  }, [page, limit]);

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
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Количество элементов на странице"
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 15, name: "15" },
          { value: -1, name: "Показать всё" },
        ]}
      />
      {/* <Pagination totalPages={totalPages} page={page} setPage={setPage} /> */}
      {postError && <h1>Произошла ошибка ${postError} </h1>}
      {isPostsLoading && (
        <div style={{ display: "flex", justifyContent: "center " }}>
          <MyLoader />
        </div>
      )}

      <PostsList
        deletePost={deletePost}
        posts={sortedAndSearchedPosts}
        title="Список постов №1"
      />
      <div ref={lastElement}></div>
    </div>
  );
}

export default Posts;
