import React from "react";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostList from "./pages/PostList";
import PostForm from "./pages/PostForm";
import PostDetail from "./pages/PostDetail";
import CommentForm from "./pages/CommentForm";

function App() {
  return (
    <Routes>
      <Route exact path="/" component={Home} />
      <Route exact path="/posts" component={PostList} />
      <Route exact path="/posts/:id" component={PostDetail} />
      <Route path="/new" component={PostForm} />
      <Route exact path="/posts/:id/comments/new" component={CommentForm} />
    </Routes>
  );
}

export default App;
