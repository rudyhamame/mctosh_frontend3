import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";

const Header = (props) => {
  return (
    <header id="header_app_page">
      <div id="header_app_content" className="fr">
        <Logo />
        <Nav
          content_component_switcher={props.content_component_switcher}
          username={props.username}
        />
      </div>
    </header>
  );
};

export default Header;
