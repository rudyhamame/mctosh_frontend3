import BiochemMolbio from "../content_components/biochem_molbio/BiochemMolbioNotes";
import BioOfCells from "../content_components/bio_of_cells/BioOfCellsNotes";
import HumanDevGen from "../content_components/human_devgen/HumanDevGenNotes";
import HomeContent from "../content_components/home_content/HomeContent";
import "../css/content.css";

const Content = (props) => {
  return (
    <div
      id="content_main_app"
      style={{
        order: "1",
        backgroundColor: "var(--gay_for_read)",
        overflow: "hidden",
        flexGrow: "1",
        backgroundColor: "var(--blue)",
        margin: "0 auto",
        boxShadow: "1px 0 6px black",
      }}
      className="fc"
    >
      {props.content_component}
    </div>
  );
};

export default Content;
