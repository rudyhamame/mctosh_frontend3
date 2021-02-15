import React from "react";
import Posts from "./Posts/Posts";
import Friends from "./Friends/Friends";

const Main = (props) => {
  return (
    <main id="Main_article" className="fr">
      <Posts state={props.state} />
      <Friends
        state={props.state}
        searchUsers={props.searchUsers}
        addFriend={props.addFriend}
        RetrievingMySendingMessages={props.RetrievingMySendingMessages}
        sendToMeMessage={props.sendToMeMessage}
        sendToThemMessage={props.sendToThemMessage}
      />
    </main>
  );
};

export default Main;
