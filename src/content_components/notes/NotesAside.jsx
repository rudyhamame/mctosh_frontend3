import React from "react";
import Data from "../../static_components/Data";
import "./NotesAside.css";

const NotesAside = (props) => {
  console.log(props.received_auth_report);
  const openNotesAside = () => {
    let NotesAside_main_container = document.getElementById(
      "NotesAside_main_container"
    );
    let control_NotesAside = document.getElementById("control_NotesAside");
    let open_icon = document.getElementById("i_open_NotesAside");
    if (control_NotesAside.title === "unclicked") {
      NotesAside_main_container.style.width = "300px";
      control_NotesAside.title = "clicked";
      open_icon.className = "fas fa-arrow-right";
    } else {
      NotesAside_main_container.style.width = "0";
      control_NotesAside.title = "unclicked";
      open_icon.className = "fas fa-arrow-left";
    }
  };

  return (
    <aside id="NotesAside_main_page" className="fr">
      <section id="NotesAside_main_container" className="fc"></section>
      <section
        onClick={openNotesAside}
        className="fr"
        id="control_NotesAside"
        title="unclicked"
      >
        <i id="i_open_NotesAside" class="fas fa-arrow-left"></i>
      </section>
    </aside>
  );
};

export default NotesAside;
