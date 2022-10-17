import React, { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container navbar__container">
        <div className="navbar__links">
          <Link style={{color: 'yellow'}} to="/">About</Link>
          <Link style={{color: 'yellow'}} to="/posts">Posts</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
