import axios from "axios";

const url = "http://localhost:3000/posts";

export const fetchPosts = () => axios.get(url);
export const fetchPost = (id) => axios.get(`${url}/${id}`);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) =>
  axios.put(`http://localhost:3000/posts/${id}`, updatedPost);
export const deletePost = (id) =>
  axios.delete(`http://localhost:3000/posts/${id}`);
export const likePost = (id) =>
  axios.put(`http://localhost:3000/posts/${id}/likePost`);

export const createComment = (id, newComment) =>
  axios.post(`http://localhost:3000/posts/${id}/comments`, newComment);
export const updateComment = (id, commentId, updatedComment) =>
  axios.put(
    `http://localhost:3000/posts/${id}/comments/${commentId}`,
    updatedComment
  );
export const deleteComment = (id, commentId) =>
  axios.delete(`http://localhost:3000/posts/${id}/comments/${commentId}`);

export const signIn = (formData) =>
  axios.post("http://localhost:3000/users/signin", formData);
export const signUp = (formData) =>
  axios.post("http://localhost:3000/users/signup", formData);
