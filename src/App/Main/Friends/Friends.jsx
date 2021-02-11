import React from "react";
import Chat from "./Chat/Chat";

const NotesAside = (props) => {
  console.log(props.received_auth_report);
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
  function sending_message() {
    const url_send =
      "http://localhost:4000/api/chat/" + props.state.online_friend_selected;

    const options_send = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: props.state.friend_id,
        message: chat_input.value,
        status: "received",
      }),
    };
    let req_send = new Request(url_send, options_send);
    fetch(req_send)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("BAD HTTP!");
        }
      })
      .catch((err) => {
        console.log("error:", err.message);
      });

    ////////////////////////////////ME//////////////////////////////////////
    const url_receive =
      "http://localhost:4000/api/chat/" + props.state.friend_id;

    const options_receive = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: props.state.online_friend_selected,
        message: chat_input.value,
        status: "sent",
      }),
    };
    let req_receive = new Request(url_receive, options_receive);
    fetch(req_receive)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("BAD HTTP!");
        }
      })
      .catch((err) => {
        console.log("error:", err.message);
      })
      .finally(() => {
        chat_input.value = "";
      });
  }

  /////////////////////////////online_friends_show////////////////////////
  const online_friends_show = () => {
    let online_page = document.getElementById("online_page");
    let chat_page = document.getElementById("chat_page");
    online_page.style.height = "100%";
    chat_page.style.height = "0";
  };
  //////////////////////////SEND BY ENTER////////////////////////////////////
  const send_by_enter = (event) => {
    if (event.which === 13) {
      sending_message();
    }
  };

  return (
    <aside id="NotesAside_main_page" className="fr">
      <section id="NotesAside_main_container" className="fc">
        <Chat />
        <section id="chat_page" className="fc">
          <section
            id="fetching_conversation_title"
            style={{
              padding: "10px",
              backgroundColor: "var(--blue)",
              fontFamily: "'Roboto', sans-serif",
              alignItems: "center",
            }}
            className="fr"
          >
            <i
              class="fas fa-chevron-circle-left"
              style={{
                fontSize: "18pt",
                position: "absolute",
                padding: "10px 7px",
              }}
              onClick={online_friends_show}
            ></i>
            <h1 style={{ fontSize: "16pt", fontWeight: "300", flexGrow: "1" }}>
              {props.state.online_friend_selected !== null &&
                props.state.friend_isTyping === false &&
                document.getElementById(props.state.online_friend_selected)
                  .title}

              {props.state.friend_isTyping === true && "Typing..."}
            </h1>
          </section>
          <section id="fetching_conversation">
            <ul className="fc" id="chat_history"></ul>
          </section>
          <section id="sending_chat_form" className="fr">
            <textarea
              id="chat_input"
              onChange={props.postProfile_info}
              onKeyDown={(event) => send_by_enter(event)}
            ></textarea>
            <button
              style={{
                backgroundColor: "var(--green)",
                border: "0",
                color: "white",
                borderBottomLeftRadius: "0",
                borderTopLeftRadius: "0",
                borderBottomRightRadius: "8px",
                borderTopRightRadius: "8px",
                boxShadow: "0",
              }}
            >
              <i class="fc far fa-paper-plane" onClick={sending_message}></i>
            </button>
          </section>
        </section>
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

export default NotesAside;
