import React from "react";
import "../css/aside.css";
import "../css/main.css";
import Content from "./Content";
import MenuAside from "./MenuAside";
import TodoAside from "./TodoAside";

const Main = (props) => {
  return (
    <main id="main_app_page" className="fr">
      <Content
        content_component={props.content_component}
        content_component_switcher={props.content_component_switcher}
      />
      <MenuAside
        content_component_switcher={props.content_component_switcher}
      />
      <TodoAside username={props.username} />
    </main>
  );
};

export default Main;
