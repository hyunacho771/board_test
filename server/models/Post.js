const mongoose = require("mongoose");
const connectDB = require("../db");

connectDB();

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

postSchema.statics.getAll = async function () {
  try {
    const posts = await this.find({});
    return posts;
  } catch (error) {
    throw Error(error);
  }
};

postSchema.statics.createPost = async function (post) {
  try {
    const newPost = await this.create(post);
    newPost.save();
    return newPost;
  } catch (error) {
    throw Error(error);
  }
};

postSchema.statics.deletePost = async function (id) {
  try {
    const deletedPost = await this.findByIdAndDelete(id);
    return deletedPost;
  } catch (error) {
    throw Error(error);
  }
};

postSchema.statics.updatePost = async function (id, post) {
  try {
    const updatedPost = await this.findByIdAndUpdate(id, post);
    return updatedPost;
  } catch (error) {
    throw Error(error);
  }
};

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
