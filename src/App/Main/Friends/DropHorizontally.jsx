import React from "react";

const DropHorizontally = () => {
  function open_fiendsonline_list() {
    let section = document.getElementById("online_page");
    let open_icon = document.getElementById("open_onlinelist");
    let close_icon = document.getElementById("close_onlinelist");
    section.style.display = "inline";
    open_icon.style.display = "none";
    close_icon.style.display = "inline";
  }
  function close_fiendsonline_list() {
    let section = document.getElementById("online_page");
    let open_icon = document.getElementById("open_onlinelist");
    let close_icon = document.getElementById("close_onlinelist");
    section.style.display = "none";
    open_icon.style.display = "inline";
    close_icon.style.display = "none";
  }
  return (
    <section id="control_onlinefriends_window">
      <i
        class="fas fa-users"
        id="open_onlinelist"
        onClick={open_fiendsonline_list}
      ></i>
      <i
        class="fas fa-users"
        id="close_onlinelist"
        onClick={close_fiendsonline_list}
      ></i>
    </section>
  );
};

export default DropHorizontally;
