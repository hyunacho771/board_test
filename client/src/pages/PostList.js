//PostList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PostList.css";
import { Button } from "@material-ui/core";

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
        setPosts(posts.map((post) => (post._id !== id ? post : res.data)));
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
    <div className="post-list">
      <h1>Posts</h1>
      <button onClick={toggleForm}>New Post</button>
      {showForm && <PostForm addPost={addPost} toggleForm={toggleForm} />}
      {postComponents.length ? postComponents : <p>No posts found</p>}
    </div>
  );
};

const Post = ({ _id, title, content, author, deletePost, updatePost }) => {
  const [showForm, setShowForm] = useState(false);
  const [post, setPost] = useState({ title, content });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost(_id, post);
    setShowForm(false);
  };

  return (
    <div className="post">
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="content"
            value={post.content}
            onChange={handleChange}
          />
          <input type="submit" value="update" />
        </form>
      ) : (
        <>
          <Link to={`/posts/${_id}`}>
            <h3>{title}</h3>
          </Link>
          <p>{content}</p>
          <p>{author}</p>
          <Button onClick={() => deletePost(_id)}>Delete</Button>
          <Button onClick={toggleForm}>Edit</Button>
        </>
      )}
    </div>
  );
};

const PostForm = ({ addPost, toggleForm }) => {
  const [post, setPost] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/posts", post)
      .then((res) => {
        addPost(res.data);
        toggleForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div class="post-list">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="content"
          placeholder="Content"
          value={post.content}
          onChange={handleChange}
        />
        <input type="submit" value="Create" />
      </form>
    </div>
  );
};

export default PostList;
