import React from "react";
import Logo from "./header-components/Logo";
import Nav from "./header-components/Nav";
import "./css/header.css";
const Header = () => {
  return (
    <header id="header_app">
      <div id="header_app_content">
        <Logo />
        <Nav />
      </div>
    </header>
  );
};

export default Header;
