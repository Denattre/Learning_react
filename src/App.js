import React, { useState } from "react";
// import Counter from "./component/Counter";
// import ClassCounter from "./component/ClassCounter";
import "./styles/App.css";
import PostsList from "./component/PostsList";
import FormPost from "./component/FormPost";
import MySelect from "./component/UI/Select/MySelect";
import MyInput from "./component/UI/Input/MyInput";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "azsd", description: "sdd of post №1" },
    { id: 2, title: "sdsds", description: "aa of post №2" },
    { id: 3, title: "asdsd", description: "zaaa of post №3" },
  ]);

  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  function getSortedPosts() {
    if (selectedSort) {
      return [...posts].sort((a, b) => {
        return a[selectedSort].localeCompare(b[selectedSort]);
      });
    } else return posts;
  }
  const sortedPosts = getSortedPosts();
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const deletePost = (post) => {
    setPosts(
      posts.filter((el) => {
        return el.id !== post.id;
      })
    );
  };

  const sortPosts = (sort) => {
    setSelectedSort(sort);
    console.log(sort);
  };
  // const searchPost = (search) => {
  //   setSearch(search);
  //   setPosts(
  //     posts.filter((post) => {
  //       return post.title.includes(search) || post.description.includes(search);
  //     })
  //   );
  // };

  return (
    <div className="App">
      {/* <Counter />
      <ClassCounter /> */}
      <FormPost create={createPost}></FormPost>
      <hr style={{ margin: "15px 0" }}></hr>
      <MyInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Поиск..."
      />
      <MySelect
        defaultValue="Сортировка"
        options={[
          { value: "title", name: "По заголовку" },
          { value: "description", name: "По описанию" },
        ]}
        value={selectedSort}
        onChange={sortPosts}
      ></MySelect>
      {posts.length > 0 ? (
        <PostsList
          deletePost={deletePost}
          posts={sortedPosts}
          title="Список постов №1"
        />
      ) : (
        <h1 style={{ textAlign: "center" }}>Посты не найдены!</h1>
      )}
    </div>
  );
}

export default App;
