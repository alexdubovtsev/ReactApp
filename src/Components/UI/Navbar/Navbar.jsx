import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context";
import MyButton from "../button/MyButton";

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  };
  return (
    <div className="navbar">
      <div className="container navbar__container">
        <MyButton onClick={logout}>Logout</MyButton>
        <div className="navbar__links">
          <Link style={{ color: "yellow" }} to="/">
            About
          </Link>
          <Link style={{ color: "yellow" }} to="/posts">
            Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
