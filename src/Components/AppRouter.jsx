import React from "react";
import {
  Route,
  Routes,
} from "react-router-dom";

import About from "../Pages/About";
import NotFound from "../Pages/NotFound";
import PostIdPage from "../Pages/PostIdPage";
import Posts from "../Pages/Posts";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<About />} />
      {/* props exact для того, чтобы пути, имеющие /posts, воспринимались как разные */}
      <Route exact path="/posts" element={<Posts />} />
      {/* Чтобы машрут был динамичесикм, пишем двоеточие перед параметром*/}
      <Route exact path="/posts/:id" element={<PostIdPage/>} />
      {/* Если ничего не найдено, отрисуем NotFoundPage*/}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
