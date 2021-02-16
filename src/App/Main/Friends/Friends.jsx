import React from "react";
import AddFirend from "./AddFriend/AddFriend";
import Chat from "./Chat/Chat";
import DropHorizontally from "./DropHorizontally";
import FriendsList from "./FriendsList/FriendsList";

const Friends = (props) => {
  const openNotesAside = () => {
    let Friends_content_container = document.getElementById(
      "Friends_content_container"
    );
    let Friends_article = document.getElementById("Friends_article");
    let Friends_control_door = document.getElementById("Friends_control_door");
    let app_page = document.querySelector("#app_page");
    let app_page_css = window.getComputedStyle(app_page);
    if (Friends_control_door.title === "unclicked") {
      if (parseInt(app_page_css.width) >= 1500) {
        Friends_content_container.style.width = "600px";
      }
      if (parseInt(app_page_css.width) < 1600) {
        Friends_content_container.style.width = "500px";
      }
      if (parseInt(app_page_css.width) < 1200) {
        Friends_article.style.height = "80vh";
        Friends_content_container.style.height = "100%";
      }

      Friends_control_door.title = "clicked";
    } else {
      if (parseInt(app_page_css.width) < 1200) {
        Friends_content_container.style.height = "0";
        Friends_content_container.style.height = "initial";
      } else {
        Friends_content_container.style.width = "0";
      }
      Friends_control_door.title = "unclicked";
    }
  };

  return (
    <aside id="Friends_article" className="fr">
      <section id="Friends_content_container" className="fc">
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
      {props.type === "pc" && (
        <section
          onClick={openNotesAside}
          className="fr"
          id="Friends_control_door"
          title="unclicked"
        >
          <i id="chat_icon" class="fas fa-users"></i>
        </section>
      )}
    </aside>
  );
};

export default Friends;
