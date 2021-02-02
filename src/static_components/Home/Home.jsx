import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";

//........import CSS...........
import "../css/aside.css";
import "../css/footer.css";
import "../css/content.css";
import "../css/main.css";
import "../css/header.css";

//........Home Component...........
const Home = (props) => {
  //...............Todo REST functions.......................
  // task_input_ID.value = ""; //cleaning inputs
  // deadline_input_ID.value = "";
  // note_input_ID.value = ""; //cleaning inputs
  // subject_input_ID.value = "";
  // textbook_input_ID.value = "";
  // page_input_ID.value = "";
  // category_input_ID.value = "";
  //...............REST functions.......................

  return (
    <div id="app_page" className="fc">
      <Header
        username={props.username}
        dbUpdate_isConnected={props.dbUpdate_isConnected}
        logOut={props.logOut}
      />
      <Main
        username={props.username}
        fetchData={props.fetchData}
        first_name={props.first_name}
      />
      <Footer />
    </div>
  );
};

export default Home;
