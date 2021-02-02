import React from "react";

import Content from "./Content";
import MenuAside from "./MenuAside";
import TodoAside from "./TodoAside";
import NotesAside from "../content_components/notes/NotesAside";

const Main = (props) => {
  return (
    <main id="main_app_page" className="fr">
      <Content
        rendered_page_switcher={props.rendered_page_switcher}
        rendered_page={props.rendered_page}
        username={props.username}
        first_name={props.first_name}
      />
      <MenuAside
        rendered_page_switcher={props.rendered_page_switcher}
        rendered_page={props.rendered_page}
        username={props.username}
      />
      <TodoAside username={props.username} fetchData={props.fetchData} />
      <NotesAside username={props.username} fetchData={props.fetchData} />
    </main>
  );
};

export default Main;
