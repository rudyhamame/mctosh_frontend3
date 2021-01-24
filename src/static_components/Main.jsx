import React from "react";
import "../css/aside.css";
import "../css/main.css";
import Content from "./Content";
import Aside from "./Aside";

const Main = (props) => {
  return (
    <main id="main_app">
      <Content content_component={props.content_component} />
      <Aside content_component_switcher={props.content_component_switcher} />
    </main>
  );
};

export default Main;
