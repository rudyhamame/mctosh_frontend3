import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const loggingOUT = () => {
    sessionStorage.removeItem("loginState");
    window.location.reload();
  };

  const closeMenu = () => {
    let aside_main_app = document.getElementById("aside_main_app");
    let menu_icon = document.getElementById("menu_icon");
    if (menu_icon.title === "unclicked") {
      aside_main_app.style.display = "inline";
      menu_icon.title = "clicked";
    } else {
      aside_main_app.style.display = "none";
      menu_icon.title = "unclicked";
    }
  };
  return (
    <nav id="nav">
      <Link to="/">
        <i class="fas fa-home"></i>
      </Link>
      <i onClick={loggingOUT} class="fas fa-sign-out-alt"></i>
      <i
        id="menu_icon"
        title="unclicked"
        onClick={closeMenu}
        class="fas fa-bars"
      ></i>
    </nav>
  );
};

export default Nav;
