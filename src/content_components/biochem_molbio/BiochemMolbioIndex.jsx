import React from "react";
import BiochemMolbioNotes from "./BiochemMolbioNotes";

const BiochemMolbioIndex = (props) => {
  function click_notes() {
    let notes_h2 = document.getElementById("notes_h2");
    if (notes_h2.title === "unclicked") {
      notes_h2.title = "clicked";
      document.documentElement.style.setProperty("--blue", "#1877f2");
    }
  }
  return (
    <div
      style={{
        margin: "0 auto",
        overflow: "hidden",
        backgroundColor: "var(--blue)",
        boxShadow: "0 -1px 3px black",
        flexGrow: "1",
        width: "100%",
      }}
      className="fr"
    >
      <div id="notes_div" style={{ flexGrow: "1" }} className="fc">
        <h2 title="unclicked" onClick={click_notes} id="notes_h2">
          notes
        </h2>
        <BiochemMolbioNotes />
      </div>
      <div id="terminology_div">
        <h2 title="unclicked" id="terminology_h2">
          terminology
        </h2>
      </div>
    </div>
  );
};

export default BiochemMolbioIndex;
