//components/CommentForm.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createComment } from "../utils/api";
const CommentForm = () => {
  const [comment, setComment] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = window.location.pathname.split("/")[2];
    await createComment(id, comment);
    history.push("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="comment"
          value={comment}
          placeholder="Add Comment"
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
