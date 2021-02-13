import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout/Logout";
import Menu from "./Menu/Menu";
import Notifications from "./Notifications/Notifications";
const Nav = (props) => {
  const loggingOUT = () => {
    props.logOut();
  };
  const dim = () => {
    let i_dim_menu = document.getElementById("i_dim_menu");
    if (i_dim_menu.title === "unclicked") {
      i_dim_menu.title = "clicked";
      document.documentElement.style.setProperty("--blue", "#282828");
      document.getElementById("fetching_out_page").style.backgroundColor =
        "var(--white)";
    } else {
      i_dim_menu.title = "unclicked";
      document.documentElement.style.setProperty("--blue", "#1877f2");
      document.getElementById("fetching_out_page").style.backgroundColor =
        "var(--black)";
    }
  };

  return (
    <nav id="Nav_article" className="fr">
      <Link to="/">
        <i class="fas fa-home" id="i_nav_home"></i>
      </Link>
      <Menu />

      <Logout logOut={loggingOUT} />
      <i
        id="Nav_dim_i"
        class="fas fa-adjust"
        title="unclicked"
        onClick={dim}
      ></i>
      <Notifications state={props.state} acceptFriend={props.acceptFriend} />
    </nav>
  );
};

export default Nav;
