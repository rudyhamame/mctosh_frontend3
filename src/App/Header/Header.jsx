import React from "react";
import Logo from "./Logo/Logo";
import Nav from "./Nav/Nav";
import Search from "./Search/Search";

const Header = (props) => {
  return (
    <header id="Header_article">
      <div id="Header_content_container" className="fr">
        <Logo />
        <Search />
        <Nav
          rendered_page_switcher={props.rendered_page_switcher}
          username={props.username}
          dbUpdate_isConnected={props.dbUpdate_isConnected}
          logOut={props.logOut}
          state={props.state}
          acceptFriend={props.acceptFriend}
        />
      </div>
    </header>
  );
};

export default Header;
