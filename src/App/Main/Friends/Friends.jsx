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
    let searchPosts = document.getElementById("SearchPosts_article");
    let Friends_article = document.getElementById("Friends_article");
    let Friends_control_door = document.getElementById("Friends_control_door");
    let app_page = document.querySelector("#app_page");
    let app_page_css = window.getComputedStyle(app_page);
    let Header_article = document.getElementById("Header_article");
    if (Friends_control_door.title === "unclicked") {
      props.dbUpdate_user_connected(true);
      if (parseInt(app_page_css.width) >= 1500) {
        Friends_content_container.style.width = "400px";
      }

      if (parseInt(app_page_css.width) < 1200) {
        searchPosts.style.display = "none";
        Friends_article.style.height = "100vh";
        Friends_content_container.style.height = "100%";
        Header_article.style.display = "none";
      }
      Friends_control_door.title = "clicked";
    } else {
      props.dbUpdate_user_connected(false);
      if (parseInt(app_page_css.width) < 1200) {
        Header_article.style.display = "inline";
        searchPosts.style.display = "flex";
        Friends_article.style.height = "initial";
        Friends_content_container.style.height = "0";
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
        <FriendsList state={props.state} />
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
        id="Friends_control_door"
        title="unclicked"
      >
        {props.state.isOnline === true && (
          <i
            id="chat_icon"
            style={{ color: "#32cd32" }}
            class="fas fa-users"
          ></i>
        )}
        {props.state.isOnline === false && (
          <i id="chat_icon" class="fas fa-users"></i>
        )}
      </section>
    </aside>
  );
};

export default Friends;
