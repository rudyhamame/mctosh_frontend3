import React from "react";

const Search = (props) => {
  let Search_input = document.getElementById("Search_input");
  let AddFriend_addFriend_results = document.getElementById(
    "AddFriend_addFriend_results"
  );
  ///////////////////////////SEATCH FOR USERS TO BE FRIENDS///////////////

  function send_by_enter(event) {
    if (event.which === 13 && Search_input) {
      props.searchUsers(Search_input.value);
      AddFriend_addFriend_results.innerHTML = "";
    }
  }
  // function sendRequest() {
  //   props.searchUsers(Search_input.value);
  // }
  return (
    <section id="Search_section" className="fr">
      {props.component === "AddFriend" && (
        <button
          id="Search_button"
          onClick={() => {
            if (AddFriend_addFriend_results && Search_input) {
              AddFriend_addFriend_results.innerHTML = "";
              props.searchUsers(Search_input.value);
            }
          }}
        >
          Search
        </button>
      )}
      {props.component === "AddFriend" && (
        <input
          id="Search_input"
          type="text"
          placeholder="Search by name"
          onChange={() => {
            if (Search_input) {
              if (Search_input.value === "")
                AddFriend_addFriend_results.innerHTML = "";
            }
          }}
          onKeyPress={(event) => {
            send_by_enter(event);
          }}
        />
      )}
    </section>
  );
};

export default Search;
