import BiochemMolbio from "../content_components/biochem_molbio/BiochemMolbioNotes";
import BioOfCells from "../content_components/bio_of_cells/BioOfCellsNotes";
import HumanDevGen from "../content_components/human_devgen/HumanDevGenNotes";
import HomeContent from "../content_components/home_content/HomeContentTodo";
import "../css/content.css";

const Content = (props) => {
  return <div id="content_main_app">{props.content_component}</div>;
};

export default Content;
