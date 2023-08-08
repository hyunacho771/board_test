//PostList.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import PostForm from "./PostForm";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

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

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const addPost = (post) => {
    setPosts([post, ...posts]);
  };

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
    <div className="PostList">
      <h1>Post List</h1>
      <button onClick={toggleForm}>Add Post</button>
      {showForm && <PostForm addPost={addPost} toggleForm={toggleForm} />}
      {postComponents}
    </div>
  );
};

export default PostList;
