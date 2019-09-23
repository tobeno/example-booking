import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={HomePage} />
      <Route path="/book" exact component={BookPage} />
    </BrowserRouter>
  );
};

export default Router;
