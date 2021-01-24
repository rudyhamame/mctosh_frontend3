import BiochemMolbio from "../content_components/biochem_molbio/BiochemMolbio";
import BioOfCells from "../content_components/bio_of_cells/BioOfCells";
import HumanDevGen from "../content_components/human_devgen/HumanDevGen";
import HomeContent from "../content_components/home_content/HomeContent";
import HorizontalNav from "./HorizontalNav";

const Content = (props) => {
  return (
    <div id="content_main_app">
      <HorizontalNav />
      {props.content_component}
    </div>
  );
};

export default Content;
