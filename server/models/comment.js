//comment.js
const mongoose = require("mongoose");
const connectDB = require("../db");

connectDB();

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: mongoose.Schema.Types.String,
      required: [true, "Content is required"],
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.statics.getAll = async function () {
  try {
    const comments = await this.find({});
    return comments;
  } catch (error) {
    throw Error(error);
  }
};

commentSchema.statics.createComment = async function (comment) {
  try {
    const newComment = await this.create(comment);
    newComment.save();
    return newComment;
  } catch (error) {
    throw Error(error);
  }
};

commentSchema.statics.deleteComment = async function (id) {
  try {
    const deletedComment = await this.findByIdAndDelete(id);
    return deletedComment;
  } catch (error) {
    throw Error(error);
  }
};

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
