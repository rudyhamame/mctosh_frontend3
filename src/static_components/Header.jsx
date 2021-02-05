import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";

const Header = (props) => {
  return (
    <header id="header_app_page">
      <div id="header_app_content" className="fr">
        <Logo />
        <section id="keyword_search_NotesAside" className="fr">
          <button id="label_search_NotesAside">Search</button>
          <input
            id="input_keyword_search"
            type="text"
            // onChange={() =>
            //   search_by_deadline_Data(
            //     document.getElementById("input_deadline_search").value
            //   )
            // }
            placeholder="Enter a keyword"
          />
        </section>
        <Nav
          rendered_page_switcher={props.rendered_page_switcher}
          username={props.username}
          dbUpdate_isConnected={props.dbUpdate_isConnected}
          logOut={props.logOut}
        />
      </div>
    </header>
  );
};

export default Header;
