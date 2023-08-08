//Post.js
//posting app using react and nodejs

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Post = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = { content: comment };
    await axios.post(`http://localhost:3000/posts/${id}/comments`, newComment);
    setComments([...comments, newComment]);
    setComment("");
  };

  const handleDelete = async (commentId) => {
    await axios.delete(
      `http://localhost:3000/posts/${id}/comments/${commentId}`
    );
    setComments(comments.filter((comment) => comment._id !== commentId));
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <h4>Comments</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button>Submit</button>
      </form>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.content}</p>
          <button onClick={() => handleDelete(comment._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Post;
