import React from "react";

const Chat = (props) => {
  function auto_grow(event) {
    let textarea = document.getElementById("Chat_textarea_input");
    textarea.style.height = textarea.scrollHeight + "px";

    if (event.which === 8) {
      textarea.style.height = textarea.scrollHeight - 20 + "px";
    }
  }
  function minimizeHeight() {
    let textarea = document.getElementById("Chat_textarea_input");

    if (textarea.value === "") {
      textarea.style.height = "70px";
    }
  }
  function send_by_enter(event) {
    if (event.which === 13) {
      props.sendToMeMessage();
      props.sendToThemMessage();
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
          }}
        ></i>
        <h1 id="Chat_title_text">
          {/* {props.state.friend === true && "Typing..."} */}
        </h1>
      </section>
      <section id="Chat_fetching_area">
        <ul className="fc" id="Chat_messages"></ul>
      </section>
      <section id="Chat_form" className="fr">
        <textarea
          id="Chat_textarea_input"
          // onChange={props.postProfile_info}
          // onKeyDown={(event) => send_by_enter(event)}
          onKeyDown={(event) => {
            auto_grow(event);
            send_by_enter(event);
          }}
          onChange={(event) => minimizeHeight(event)}
        ></textarea>
        <button id="Chat_submit_button">
          <i
            class="fc far fa-paper-plane"
            onClick={() => {
              props.sendToMeMessage();
              props.sendToThemMessage();
            }}
          ></i>
        </button>
      </section>
    </article>
  );
};

export default Chat;
