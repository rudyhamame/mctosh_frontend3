import React from "react";

import Content from "./Content";
import MenuAside from "./MenuAside";
import TodoAside from "./TodoAside";
import NotesAside from "../content_components/notes/NotesAside";

const Main = (props) => {
  switch (props.page) {
    case "home":
      return (
        <main id="main_app_page" className="fr">
          <Content
            rendered_page_switcher={props.rendered_page_switcher}
            rendered_page={props.rendered_page}
            username={props.username}
            first_name={props.first_name}
            page="home"
            state={props.state}
          />
          <MenuAside
            rendered_page_switcher={props.rendered_page_switcher}
            rendered_page={props.rendered_page}
            username={props.username}
          />
          <TodoAside
            username={props.username}
            fetchData={props.fetchData}
            state={props.state}
          />
          <NotesAside username={props.username} fetchData={props.fetchData} />
        </main>
      );
      break;

    case "profile":
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
        </main>
      );
      break;
  }
};

export default Main;
