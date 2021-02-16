import React from "react";
import { Link } from "react-router-dom";
import Dim from "./Dim/Dim";
import Logout from "./Logout/Logout";
import Menu from "./Menu/Menu";
import MessengerIcon from "./MessengerIcon/MessengerIcon";
import Notifications from "./Notifications/Notifications";
const Nav = (props) => {
  let app_page = document.getElementById("root");
  let width = window.getComputedStyle(app_page).width;

  return (
    <nav id="Nav_article" className="fr">
      <Link to="/">
        <i class="fas fa-home" id="Nav_home_i"></i>
      </Link>
      <Menu />
      <Logout logOut={props.logOut} />
      <Notifications state={props.state} acceptFriend={props.acceptFriend} />
      {parseInt(width) < 1200 && <MessengerIcon />}
    </nav>
  );
};

export default Nav;
