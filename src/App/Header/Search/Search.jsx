import React from "react";

const Search = (props) => {
  let Search_input = document.getElementById("Search_input");
  let AddFriend_addFriend_results = document.getElementById(
    "AddFriend_addFriend_results"
  );
  ///////////////////////////SEATCH FOR USERS TO BE FRIENDS///////////////

  function send_by_enter(event) {
    if (event.which === 13 && Search_input) {
      props.searchPosts();
    }
  }

  return (
    <section id="Search_section" className="fr">
      <button id="Search_button" onClick={() => {}}>
        Search
      </button>
      <input
        id="Search_input"
        type="text"
        placeholder="Enter a keyword"
        onChange={() => {
          props.searchPosts();
          if (document.getElementById("Search_input").value === "")
            props.searchPosts("turn_off");
        }}
        onKeyPress={(event) => {
          send_by_enter(event);
        }}
      />
    </section>
  );
};

export default Search;
