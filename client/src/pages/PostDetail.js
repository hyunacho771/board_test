import React, { useState, useEffect } from "react";
import "./PostDetail.css";
import Comment from "../components/Comment";
import PostForm from "../components/PostForm";
import axios from "axios";

const PostDetail = (props) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const postId = props.match.params.id;
    axios
      .get(`http://localhost:3000/posts/${postId}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:3000/posts/${postId}/comments`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.match.params.id]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const updatePost = (updatedPost) => {
    axios
      .put(`http://localhost:3000/posts/${post._id}`, updatedPost)
      .then((res) => {
        setPost(res.data);
        toggleForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postId) => {
    axios
      .delete(`http://localhost:3000/posts/${postId}`)
      .then(() => {
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const commentComponents = comments.map((comment) => (
    <Comment key={comment._id} {...comment} />
  ));

  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <button onClick={toggleForm}>Edit</button>
      {showForm && (
        <PostForm {...post} updatePost={updatePost} toggleForm={toggleForm} />
      )}
      <button onClick={() => deletePost(post._id)}>Delete Post</button>
      <button onClick={() => props.history.push("/")}>Go Back</button>
      <h3>Comments</h3>
      <button
        onClick={() => props.history.push(`/posts/${post._id}/comments/new`)}
      >
        Add Comment
      </button>
      {commentComponents}
    </div>
  );
};

export default PostDetail;
