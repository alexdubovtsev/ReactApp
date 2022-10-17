import React from "react";
import { Route, Routes } from "react-router-dom";

import { privateRouter, publicRouter } from "../Router/Router";
console.log(privateRouter);
console.log(publicRouter);

const AppRouter = () => {
  const isAuth = true;
  return isAuth ? (
    <Routes>
      {privateRouter.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.element />}
          exact={route.exact}
        />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRouter.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.element />}
          exact={route.exact}
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
