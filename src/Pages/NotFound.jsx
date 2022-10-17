import React, { useState } from "react";
import {Link} from "react-router-dom";

const NotFound = () => {

  return (
    <div>
      <h1 style={{color: 'red', marginTop: '30px', marginBottom: '30px'}}>Страница не найдена!</h1>
      <p>Go to the <Link style={{color: 'yellow'}} to="/">HOME</Link> page</p>
    </div>
  )}

export default NotFound;