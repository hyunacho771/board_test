//app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const Post = require("./models/post");
const Comment = require("./models/comment");

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  try {
    const posts = Post.getAll({});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/", (req, res) => {
  try {
    const post = Post.createPost(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
app.post("/posts", (req, res) => {
  try {
    const post = Post.createPost(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.get(`/posts/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
app.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.put("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOneAndUpdate(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
app.post("/comments", (req, res) => {
  try {
    const comment = Comment.createComment(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.delete("/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.get(`/comments/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.put("/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findOneAndUpdate(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.get("/posts/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("comments");
    res.status(200).json(post.comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
app.get("/posts/:id/comments/new", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.post("/posts/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    const comment = await Comment.createComment(req.body);
    post.comments.push(comment);
    await post.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/posts/:id/comments/:commentId", async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const post = await Post.findById(id);
    post.comments.pull(commentId);
    await post.save();
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
app.delete("/posts/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    post.comments.pull();
    await post.save();
    const deletedComment = await Comment.findByIdAndDelete();
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.post("/posts/:id/comments/new", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    const comment = await Comment.createComment(req.body);
    post.comments.push(comment);
    await post.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put("/posts/:id/comments/:commentId", async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const post = await Post.findById(id);
    const comment = await Comment.findByIdAndUpdate(commentId, req.body, {
      new: true,
    });
    post.comments.push(comment);
    await post.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/posts/:id/comments/:commentId", async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const post = await Post.findById(id);
    const comment = await Comment.findById(commentId);
    post.comments.push(comment);
    await post.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/board", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
