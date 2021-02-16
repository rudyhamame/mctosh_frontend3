import React from "react";

const Logout = (props) => {
  return (
    <section id="Logout_article">
      <i
        onClick={props.logOut}
        class="fas fa-sign-out-alt"
        id="i_nav_logout"
      ></i>
    </section>
  );
};

export default Logout;
