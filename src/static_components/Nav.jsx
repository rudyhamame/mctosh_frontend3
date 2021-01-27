import React from "react";
import HomeContent from "../content_components/home_content/HomeContent";

const Nav = (props) => {
  const loggingOUT = () => {
    sessionStorage.removeItem("loginState");
    window.location.reload();
  };

  const clickMenu = () => {
    let menuaside_main_page = document.getElementById("menuaside_main_page");
    let i_nav_menu = document.getElementById("i_nav_menu");

    if (i_nav_menu.title === "unclicked") {
      i_nav_menu.title = "clicked";
      document.documentElement.style.setProperty("--blue", "#f04e1f");
      menuaside_main_page.style.width = "20%";
    } else {
      i_nav_menu.title = "unclicked";
      document.documentElement.style.setProperty("--blue", "#1877f2");
      menuaside_main_page.style.width = "0";
    }
  };
  return (
    <nav id="app_nav" className="fr">
      <i
        onClick={() =>
          props.content_component_switcher(
            <HomeContent username={props.username} />
          )
        }
        class="fas fa-home"
        id="i_nav_home"
      ></i>
      <i onClick={loggingOUT} class="fas fa-sign-out-alt" id="i_nav_logout"></i>
      <i
        id="i_nav_menu"
        title="unclicked"
        onClick={clickMenu}
        class="fas fa-bars"
      ></i>
    </nav>
  );
};

export default Nav;
