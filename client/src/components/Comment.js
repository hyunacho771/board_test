import React, { useState, useEffect } from "react";
import "./Comment.css";
import { Avatar } from "@material-ui/core";
import axios from "axios";

const Comment = () => {
  const [comment, setComment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const id = window.location.pathname.split("/")[2];

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${id}/comments`)
      .then((res) => {
        if (res.status === 200) {
          setComment(res.data);
          setIsLoading(false);
        } else {
          console.log(`Unexpected status code: ${res.status}`);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id]);

  const deleteComment = (id, commentid) => {
    axios
      .delete(`http://localhost:3000/posts/${id}/comments/${commentid}`)
      .then((res) => {
        if (res.status === 200) {
          setComment(res.data);
          setIsLoading(false);
        } else {
          console.log(`Unexpected status code: ${res.status}`);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="Comment">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="comment__header">
          <Avatar className="comment__avatar" />
          <h3>
            {comment && comment.length > 0 ? comment[0].content : "No comments"}
          </h3>
          {/* delete button */}
          <button onClick={() => deleteComment(id, comment[0]._id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
