import React from "react";

const FriendsList = (props) => {
  return (
    <section id="FriendsList_article" className="fc">
      <section id="FriendsList_content_container" className="fc">
        <i class="fas fa-user-friends" id="FriendsList_i"></i>
        <ul className="fc" id="FriendsList_friends_list"></ul>
      </section>
    </section>
  );
};

export default FriendsList;
