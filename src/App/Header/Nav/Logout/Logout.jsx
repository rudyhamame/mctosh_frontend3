import React from "react";

const Logout = (props) => {
  return (
    <i onClick={props.logOut} class="fas fa-sign-out-alt" id="i_nav_logout"></i>
  );
};

export default Logout;
