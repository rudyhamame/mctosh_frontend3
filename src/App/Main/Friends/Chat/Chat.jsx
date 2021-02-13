import React from "react";

const Chat = () => {
  return (
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
        {/* <i
              class="fas fa-chevron-circle-left"
              style={{
                fontSize: "18pt",
                position: "absolute",
                padding: "10px 7px",
              }}
              // onClick={online_friends_show}
            ></i> */}
        <h1 style={{ fontSize: "16pt", fontWeight: "300", flexGrow: "1" }}>
          {/* {props.state.friend_target !== null &&
                props.state.friend_target === false &&
                document.getElementById(props.state.friend_target).title}

              {props.state.friend_target === true && "Typing..."} */}
        </h1>
      </section>
      <section id="fetching_conversation">
        <ul className="fc" id="chat_history"></ul>
      </section>
      <section id="sending_chat_form" className="fr">
        <textarea
          id="chat_input"
          // onChange={props.postProfile_info}
          // onKeyDown={(event) => send_by_enter(event)}
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
          {/* <i class="fc far fa-paper-plane" onClick={sending_message}></i> */}
        </button>
      </section>
    </section>
  );
};

export default Chat;
