import React from "react";
import Posts from "./Posts/Posts";
import Friends from "./Friends/Friends";
import FriendsList from "./Friends/FriendsList/FriendsList";
import Chat from "./Friends/Chat/Chat";
const Main = (props) => {
  if (props.type === "pc") {
    return (
      <main id="Main_article" className="fr">
        <Posts state={props.state} postingPost={props.postingPost} />
        {parseInt(
          window.getComputedStyle(document.querySelector("#root")).width
        ) > 1200 && (
          <Friends
            state={props.state}
            searchUsers={props.searchUsers}
            addFriend={props.addFriend}
            RetrievingMySendingMessages={props.RetrievingMySendingMessages}
            sendToMeMessage={props.sendToMeMessage}
            sendToThemMessage={props.sendToThemMessage}
            type={props.type}
          />
        )}
      </main>
    );
  }
  if (props.type === "mobile") {
    return (
      <main id="Main_article" className="fr">
        <Friends
          type={props.type}
          state={props.state}
          searchUsers={props.searchUsers}
          addFriend={props.addFriend}
          RetrievingMySendingMessages={props.RetrievingMySendingMessages}
          sendToMeMessage={props.sendToMeMessage}
          sendToThemMessage={props.sendToThemMessage}
        />
      </main>
    );
  }
};

export default Main;
