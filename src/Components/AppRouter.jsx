import React, {useContext} from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../Context";

import { privateRouter, publicRouter } from "../Router/Router";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext);

  // пока идет авторизация, Router не работает, работает Loader
  if(isLoading) {
    return <Loader/>
  }

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
