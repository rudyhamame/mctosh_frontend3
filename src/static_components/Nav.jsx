import React from "react";
import Greeting from "../content_components/greeting/Greeting";
const Nav = (props) => {
  const loggingOUT = () => {
    props.logOut();
  };
  const dim = () => {
    let i_dim_menu = document.getElementById("i_dim_menu");
    if (i_dim_menu.title === "unclicked") {
      i_dim_menu.title = "clicked";
      document.documentElement.style.setProperty("--blue", "#282828");
    } else {
      i_dim_menu.title = "unclicked";
      document.documentElement.style.setProperty("--blue", "#1877f2");
    }
  };
  const clickMenu = () => {
    let menuaside_main_page = document.getElementById("menuaside_main_page");
    let i_nav_menu = document.getElementById("i_nav_menu");

    if (i_nav_menu.title === "unclicked") {
      i_nav_menu.title = "clicked";
      menuaside_main_page.style.display = "inline";
    } else {
      i_nav_menu.title = "unclicked";
      menuaside_main_page.style.display = "none";
    }
  };
  return (
    <nav id="app_nav" className="fr">
      <i
        class="fas fa-home"
        id="i_nav_home"
        onClick={() =>
          props.rendered_page_switcher(<Greeting username={props.username} />)
        }
      ></i>
      <i onClick={loggingOUT} class="fas fa-sign-out-alt" id="i_nav_logout"></i>
      <i
        id="i_nav_menu"
        title="unclicked"
        onClick={clickMenu}
        class="fas fa-bars"
      ></i>
      <i
        id="i_dim_menu"
        class="fas fa-adjust"
        title="unclicked"
        onClick={dim}
      ></i>
    </nav>
  );
};

export default Nav;
