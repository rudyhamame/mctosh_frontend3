import React from "react";

import Tasks from "./Tasks/Tasks";
import Posts from "./Posts/Posts";
import Greeting from "./Greeting/Greeting";
import Friends from "./Friends/Friends";

const Main = (props) => {
  return (
    <main id="main_app_page" className="fr">
      <Greeting state={props.state} />
      <Tasks />
      <Posts
        username={props.username}
        first_name={props.user_first_name}
        state={props.state}
        fetchData={props.fetchData}
        loader={props.loader}
      />
      <Friends
        state={props.state}
        fetchData={props.fetchData}
        postProfile_info={props.postProfile_info}
      />
    </main>
  );
};

export default Main;
