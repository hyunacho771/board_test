const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");

// GET /posts/:postId/comments
router.get("/posts/:postId/comments", (req, res) => {
  commentsController.getComments(req, res);
});
// POST /posts/:postId/comments
router.post("/posts/:postId/comments", (req, res) => {
  commentsController.createComment(req, res);
});
// PUT /posts/:postId/comments/:commentId
router.put("/posts/:postId/comments/:commentId", (req, res) => {
  commentsController.updateComment(req, res);
});

// DELETE /posts/:postId/comments/:commentId
router.delete("/posts/:postId/comments/:commentId", (req, res) => {
  commentsController.deleteComment(req, res);
});

module.exports = router;
