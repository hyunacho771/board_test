//comments.js
const express = require("express");
const commentRouter = express.Router();
const Comment = require("../models/comment");

commentRouter.get("/", async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

commentRouter.post("/", async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

commentRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

commentRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

commentRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndUpdate(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = commentRouter;
