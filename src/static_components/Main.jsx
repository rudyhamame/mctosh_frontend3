import React from "react";
import "../css/aside.css";
import "../css/main.css";
import Content from "./Content";
import Aside1 from "./Aside1";
import Aside2 from "./Aside2";

const Main = (props) => {
  return (
    <main id="main_app">
      <Content
        content_component={props.content_component}
        content_component_switcher={props.content_component_switcher}
      />
      <Aside1 content_component_switcher={props.content_component_switcher} />
      <Aside2 username={props.username} />
    </main>
  );
};

export default Main;
