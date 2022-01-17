import React from "react";

const Chat = (props) => {
  let textarea = document.getElementById("Chat_textarea_input");

  function auto_grow(event) {
    textarea.style.height = textarea.scrollHeight + "px";
    if (event.which === 8) {
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }

  function send_by_enter(event) {
    if (event.which === 13) {
      props.sendToThemMessage(textarea.value);
    }
  }
  return (
    <article id="Chat_article" className="fc">
      <section id="Chat_title_container" className="fr">
        <i
          class="fas fa-chevron-circle-left"
          id="Chat_goback_icon"
          onClick={() => {
            document.getElementById("Chat_goback_icon").style.display = "none";
            document.getElementById("Chat_article").style.height = "0";
            document.getElementById("FriendsList_article").style.height =
              "100%";
            document.getElementById("DropHorizontally_article").style.display =
              "flex";
          }}
        ></i>
        <h1 id="Chat_title_text">
          {/* {props.state.friend_target === true && "Typing..."} */}
        </h1>
      </section>
      <ul id="Chat_messages"></ul>
      <section id="Chat_form" className="fr">
        <textarea
          id="Chat_textarea_input"
          onKeyDown={(event) => {
            auto_grow(event);
            send_by_enter(event);
          }}
        ></textarea>
        <button id="Chat_submit_button">
          <i
            class="fc far fa-paper-plane"
            onClick={() => {
              props.sendToThemMessage(textarea.value);
            }}
          ></i>
        </button>
      </section>
    </article>
  );
};

export default Chat;
