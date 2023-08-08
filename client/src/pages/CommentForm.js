//pages/commentForm.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createComment } from "../utils/api";
import "./CommentForm.css";

function CommentForm() {
  const [comment, setComment] = useState({ content: "" });
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = window.location.pathname.split("/")[2];
    const comments = { content: comment };
    await createComment(id, comments);
    history.push(`/posts/${id}`);
  };

  return (
    <div className="post-form">
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="content"
            placeholder="Add Comment"
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  );
}

export default CommentForm;
