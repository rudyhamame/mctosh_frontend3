import React from "react";
import AddFirend from "./AddFriend/AddFriend";
import Chat from "./Chat/Chat";
import DropHorizontally from "./DropHorizontally";
import FriendsList from "./FriendsList/FriendsList";

const Friends = (props) => {
  const openNotesAside = () => {
    let NotesAside_main_container = document.getElementById(
      "NotesAside_main_container"
    );
    let control_NotesAside = document.getElementById("control_NotesAside");
    if (control_NotesAside.title === "unclicked") {
      NotesAside_main_container.style.width = "600px";
      control_NotesAside.title = "clicked";
    } else {
      NotesAside_main_container.style.width = "0";
      control_NotesAside.title = "unclicked";
    }
  };

  return (
    <aside id="NotesAside_main_page" className="fr">
      <section id="NotesAside_main_container" className="fc">
        <AddFirend
          state={props.state}
          searchUsers={props.searchUsers}
          addFriend={props.addFriend}
        />
        <FriendsList />
        <Chat
          state={props.state}
          RetrievingMySendingMessages={props.RetrievingMySendingMessages}
          sendToMeMessage={props.sendToMeMessage}
          sendToThemMessage={props.sendToThemMessage}
        />
        <DropHorizontally />
      </section>
      <section
        onClick={openNotesAside}
        className="fr"
        id="control_NotesAside"
        title="unclicked"
      >
        <i id="chat_icon" class="fas fa-users"></i>
      </section>
    </aside>
  );
};

export default Friends;
