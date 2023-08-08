//axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export const fetchPosts = async () => {
  try {
    const { data } = await api.get("/posts");
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchPostById = async (postId) => {
  try {
    const { data } = await api.get(`/posts/${postId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (post) => {
  try {
    const response = await axios.post("/posts", post);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create post");
  }
};

export const updatePost = async (postId, post) => {
  try {
    const { data } = await api.put(`/posts/${postId}`, post);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const { data } = await api.delete(`/posts/${postId}`);
    return data;
  } catch (error) {
    throw error;
  }
};
