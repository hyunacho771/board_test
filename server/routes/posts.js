const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");

// GET /posts
router.get("/posts", (req, res) => {
  postsController.getPosts(req, res);
});

// GET /posts/:id
router.get("/posts/:id", (req, res) => {
  postsController.getPostById(req, res);
});

// POST /posts
router.post("/posts", (req, res) => {
  postsController.createPost(req, res);
});
// PUT /posts/:id
router.put("/posts/:id", (req, res) => {
  postsController.updatePost(req, res);
});

// DELETE /posts/:id
router.delete("/posts/:id", (req, res) => {
  postsController.deletePost(req, res);
});

// POST /posts/:id/comments
router.post("/posts/:id/comments", (req, res) => {
  postsController.createComment(req, res);
});

// PUT /posts/:id/comments/:commentId
router.put("/posts/:id/comments/:commentId", (req, res) => {
  postsController.updateComment(req, res);
});

// DELETE /posts/:id/comments/:commentId
router.delete("/posts/:id/comments/:commentId", (req, res) => {
  postsController.deleteComment(req, res);
});

//POST /new
router.post("/new", (req, res) => {
  postsController.createPost(req, res);
});

postRouter = router;
module.exports = postRouter;
