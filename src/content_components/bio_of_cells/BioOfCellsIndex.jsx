import React from "react";
import BioOfCellsNotes from "./BioOfCellsNotes";

const BioOfCellsIndex = (props) => {
  return (
    <div id="horizontal_nav_div">
      <h2 onClick={() => props.content_component_switcher(<BioOfCellsNotes />)}>
        notes
      </h2>
      <hr />
      <h2>terminology</h2>
    </div>
  );
};

export default BioOfCellsIndex;
