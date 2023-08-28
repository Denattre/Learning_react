import React, { useState, useEffect } from "react";
// import Counter from "./component/Counter";
// import ClassCounter from "./component/ClassCounter";
import "./styles/App.css";
import PostsList from "./component/PostsList";
import FormPost from "./component/FormPost";
import PostFilter from "./component/PostFilter";
import MyModal from "./component/UI/Modal/MyModal";
import MyButton from "./component/UI/Button/MyButton";
import { usePosts } from "./hooks/usePosts";
import PostService from "./API/PostService";
import MyLoader from "./component/UI/Loader/MyLoader";
import { useFetching } from "./hooks/useFetching";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const posts = await PostService.getAll();
    setPosts(posts);
  });

  useEffect(() => {
    fetchPosts();
  }, []);

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
      <button onClick={fetchPosts}>GET</button>
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

export default App;
