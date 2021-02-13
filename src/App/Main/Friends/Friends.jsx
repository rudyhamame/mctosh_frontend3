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
      NotesAside_main_container.style.width = "400px";
      control_NotesAside.title = "clicked";
    } else {
      NotesAside_main_container.style.width = "0";
      control_NotesAside.title = "unclicked";
    }
  };
  ////////////////////////////////////////////Build Chat2/////////////
  let chat_input = document.getElementById("chat_input");
  // function sending_message() {
  //   const url_send =
  //     "http://localhost:4000/api/chat/" + props.state.friend_target;

  //   const options_send = {
  //     method: "POST",
  //     mode: "cors",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       message: chat_input.value,
  //       status: "received",
  //     }),
  //   };
  // let req_send = new Request(url_send, options_send);
  // fetch(req_send)
  //   .then((response) => {
  //     if (response.ok) {
  //       return response.json();
  //     } else {
  //       throw new Error("BAD HTTP!");
  //     }
  //   })
  //   .catch((err) => {
  //     console.log("error:", err.message);
  //   });

  ////////////////////////////////ME//////////////////////////////////////
  //   const url_receive =
  //     "http://localhost:4000/api/chat/" + props.state.friend_id;

  //   const options_receive = {
  //     method: "POST",
  //     mode: "cors",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       _id: props.state.online_friend_selected,
  //       message: chat_input.value,
  //       status: "sent",
  //     }),
  //   };
  //   let req_receive = new Request(url_receive, options_receive);
  //   fetch(req_receive)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error("BAD HTTP!");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("error:", err.message);
  //     })
  //     .finally(() => {
  //       chat_input.value = "";
  //     });
  // }

  //////////////////////////SEND BY ENTER////////////////////////////////////
  // const send_by_enter = (event) => {
  //   if (event.which === 13) {
  //     sending_message();
  //   }
  // };

  return (
    <aside id="NotesAside_main_page" className="fr">
      <section id="NotesAside_main_container" className="fc">
        <AddFirend
          state={props.state}
          searchUsers={props.searchUsers}
          addFriend={props.addFriend}
        />
        <FriendsList />
        <Chat />
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
