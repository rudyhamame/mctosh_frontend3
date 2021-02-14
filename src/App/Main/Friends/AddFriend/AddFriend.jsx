import React from "react";
import Search from "../../../Header/Search/Search";

const AddFirend = (props) => {
  return (
    <section id="AddFriend_article" className="fc">
      <section id="AddFriend_content_container" className="fc">
        <i id="AddFriend_i" class="fas fa-user-plus"></i>
        <Search
          component="AddFriend"
          searchUsers={props.searchUsers}
          addFriend={props.addFriend}
        />
      </section>
      <section id="AddFriend_addFriend" className="fc">
        <ul id="AddFriend_addFriend_results" className="fc"></ul>
      </section>
    </section>
  );
};

export default AddFirend;
