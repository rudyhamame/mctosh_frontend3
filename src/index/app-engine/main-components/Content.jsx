import BiochemMolbio from "./BiochemMolbio";
import BioOfCells from "./BioOfCells";

import "./css/content.css";

const Content = (props) => {
  switch (props.toShow) {
    case "BiochemMolbio":
      return (
        <div id="content_main_app">
          <div id="contentView_div">
            <BiochemMolbio />
          </div>
        </div>
      );
    case "BioOfCells":
      return (
        <div id="content_main_app">
          <BioOfCells />
        </div>
      );
    default:
      return null;
  }
};

export default Content;
