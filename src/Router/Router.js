// Экспортируем константу, которую проинициализируем массивом маршрутов приложения (объекты, содержащие нужные поля - path, component, exact)

import About from "../Pages/About";
import Posts from "../Pages/Posts";
import PostIdPage from "../Pages/PostIdPage";
import NotFound from "../Pages/NotFound";
import Login from "../Pages/Login";

// props exact для того, чтобы пути, имеющие /posts, воспринимались как разные
// Чтобы машрут был динамичесикм, пишем двоеточие перед параметром
export const privateRouter = [
  { path: "/", element: About, exact: true},
  { path: "/posts", element: Posts, exact: true},
  { path: "/posts/:id", element: PostIdPage, exact: true},
  // Если ничего не найдено, отрисуем NotFoundPage
  { path: "*", element: NotFound, exact: true },
];

export const publicRouter = [
  { path: "/login", element: Login, exact: true },
  { path: "*", element: Login, exact: true },
];