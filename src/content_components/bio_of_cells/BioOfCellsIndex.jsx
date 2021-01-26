import React from "react";
import BioOfCellsNotes from "./BioOfCellsNotes";

const BioOfCellsIndex = (props) => {
  function click_notes() {
    let notes_h2 = document.getElementById("notes_h2");
    if (notes_h2.title === "unclicked") {
      notes_h2.title = "clicked";
      document.documentElement.style.setProperty("--blue", "#1877f2");
    }
  }
  return (
    <div
      id="horizontal_nav_div"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        margin: "0 auto",
        overflow: "hidden",
        backgroundColor: "var(--gray_for_read)",
        boxShadow: "0 -1px 3px black",
        height: "100%",
      }}
    >
      <h2 title="unclicked" onClick={click_notes} id="notes_h2">
        notes
      </h2>
      <hr />
      <h2 title="unclicked" id="terminology_h2">
        terminology
      </h2>
    </div>
  );
};

export default BioOfCellsIndex;
