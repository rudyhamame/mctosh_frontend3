import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";
import "../css/header.css";
const Header = (props) => {
  return (
    <header id="header_app">
      <div id="header_app_content">
        <Logo />
        <Nav content_component_switcher={props.content_component_switcher} />
      </div>
    </header>
  );
};

export default Header;
