//PostForm.js

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createPost } from "../utils/api";
import "./PostForm.css";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = { title, content };
    await createPost(post);
    history.push("/posts");
  };

  return (
    <div className="PostForm">
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Post title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Post content:</label>
        <textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
