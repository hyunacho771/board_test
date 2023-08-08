const Post = require("../models/post");
const Comment = require("../models/comment");

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.getAll({});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one post
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (post) {
      return res.json(post);
    }
    res.status(404).json({ message: "Post not found!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create one post
const createPost = async (req, res) => {
  try {
    const post = await new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update one post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    await post.updatePost(id, req.body);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete one post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Post.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send("Post deleted");
    }
    throw new Error("Post not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create one comment
const createComment = async (req, res) => {
  try {
    const comment = await new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update one comment
const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    await comment.updateComment(id, req.body);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete one comment
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Comment.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send("Comment deleted");
    }
    throw new Error("Comment not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one comment
const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (comment) {
      return res.json(comment);
    }
    res.status(404).json({ message: "Comment not found!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  createComment,
  updateComment,
  deleteComment,
  getAllComments,
  getCommentById,
};
