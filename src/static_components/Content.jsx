import Notes from "../content_components/notes/Notes";

import "../css/content.css";

const Content = (props) => {
  return (
    <div id="content_main_page" className="fc">
      {props.rendered_page}
    </div>
  );
};

export default Content;
