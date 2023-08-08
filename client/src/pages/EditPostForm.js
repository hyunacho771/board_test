//EditPostForm.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import PostForm from "../components/PostForm";

const EditPostForm = (props) => {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${props.match.params.id}`)
      .then((res) => {
        setPost(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [props.match.params.id]);

  const updatePost = (updatedPost) => {
    axios
      .put(`http://localhost:3000/posts/${post._id}`, updatedPost)
      .then((res) => {
        setPost(res.data);
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="edit-post">
      <h1>Edit Post</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <PostForm {...post} submit={updatePost} />
      )}
    </div>
  );
};

export default EditPostForm;
