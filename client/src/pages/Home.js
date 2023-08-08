import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import Post from "../components/Post";
import PostList from "./PostList";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3000/posts/${id}`)
      .then((res) => {
        setPosts(posts.filter((post) => post._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePost = (id, post) => {
    axios
      .put(`http://localhost:3000/posts/${id}`, post)
      .then((res) => {
        setPosts(
          posts.map((post) =>
            post._id !== id ? post : { ...post, ...res.data }
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postComponents = [];
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    postComponents.push(
      <Post
        key={post._id}
        {...post}
        deletePost={deletePost}
        updatePost={updatePost}
      />
    );
  }

  return (
    <div className="home">
      <h1>Home</h1>
      <PostList />
    </div>
  );
};

export default Home;
