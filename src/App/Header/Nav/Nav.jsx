import React from "react";
import { Link } from "react-router-dom";
import Dim from "./Dim/Dim";
import Logout from "./Logout/Logout";
import Menu from "./Menu/Menu";
import MessengerIcon from "./MessengerIcon/MessengerIcon";
import Notifications from "./Notifications/Notifications";
import ProfileIcon from "./Profile/ProfileIcon";
import Refresh from "./Refresh/Refresh";
const Nav = (props) => {
  let app_page = document.getElementById("root");
  let width = window.getComputedStyle(app_page).width;
  if (props.path === "/") {
    return (
      <nav id="Nav_article" className="fr">
        <Logout logOut={props.logOut} path="/" />
      </nav>
    );
  } else {
    if (props.state.profile === false) {
      return (
        <nav id="Nav_article" className="fr">
          <Link to="/">
            <i class="fas fa-home" id="Nav_home_i" title="Exit"></i>
          </Link>
          <ProfileIcon show_profile={props.show_profile} />
          {/* <Menu /> */}
          <Logout logOut={props.logOut} />
          <Notifications
            state={props.state}
            acceptFriend={props.acceptFriend}
          />
          {/* {parseInt(width) < 1200 && <MessengerIcon />} */}
          <Dim />
          <Refresh />
        </nav>
      );
    } else {
      return (
        <nav id="Nav_article" className="fr">
          <ProfileIcon show_profile={props.show_profile} profile="true" />
        </nav>
      );
    }
  }
};

export default Nav;
