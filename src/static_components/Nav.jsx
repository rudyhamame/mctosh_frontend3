import React from "react";
import HomeContent from "../content_components/home_content/HomeContent";

const Nav = (props) => {
  const loggingOUT = () => {
    sessionStorage.removeItem("loginState");
    window.location.reload();
  };

  const clickMenu = () => {
    let aside_main_app = document.getElementById("aside_main_app");
    let menu_icon = document.getElementById("menu_icon");

    if (menu_icon.title === "unclicked") {
      menu_icon.title = "clicked";
      document.documentElement.style.setProperty("--blue", "#f04e1f");
      aside_main_app.style.width = "20%";
    } else {
      menu_icon.title = "unclicked";
      document.documentElement.style.setProperty("--blue", "#1877f2");
      aside_main_app.style.width = "0";
    }
  };
  return (
    <nav id="nav">
      <i
        onClick={() =>
          props.content_component_switcher(
            <HomeContent username={props.username} />
          )
        }
        class="fas fa-home"
      ></i>
      <i onClick={loggingOUT} class="fas fa-sign-out-alt"></i>
      <i
        id="menu_icon"
        title="unclicked"
        onClick={clickMenu}
        class="fas fa-bars"
      ></i>
    </nav>
  );
};

export default Nav;
