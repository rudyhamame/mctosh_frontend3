import React from "react";
import { Link } from "react-router-dom";
import Login from "../../Login";

const Nav = () => {
  const loggingOUT = () => {
    sessionStorage.removeItem("loginState");
    window.location.reload();
  };

  return (
    <nav id="nav">
      <Link to="/">
        <i class="fas fa-home"></i>
      </Link>
      <i onClick={loggingOUT} class="fas fa-sign-out-alt"></i>
    </nav>
  );
};

export default Nav;
