import React from "react";

const DropHorizontally = () => {
  function showFriendList() {
    let FriendsList_article = document.getElementById("FriendsList_article");
    let AddFriend_article = document.getElementById("AddFriend_article");
    let DropHorizontally_friendsList_icon = document.getElementById(
      "DropHorizontally_friendsList_icon"
    );
    let DropHorizontally_addFriend_icon = document.getElementById(
      "DropHorizontally_addFriend_icon"
    );
    let Chat_article = document.getElementById("Chat_article");
    FriendsList_article.style.height = "100%";
    AddFriend_article.style.height = "0";
    DropHorizontally_friendsList_icon.style.color = "var(--white)";
    DropHorizontally_addFriend_icon.style.color = "var(--black)";
    Chat_article.style.height = "0";
    document.getElementById("Chat_goback_icon").style.display = "none";
  }
  function showAddFriend() {
    let FriendsList_article = document.getElementById("FriendsList_article");
    let AddFriend_article = document.getElementById("AddFriend_article");
    let DropHorizontally_addFriend_icon = document.getElementById(
      "DropHorizontally_addFriend_icon"
    );
    let DropHorizontally_friendsList_icon = document.getElementById(
      "DropHorizontally_friendsList_icon"
    );
    FriendsList_article.style.height = "0";
    AddFriend_article.style.height = "100%";
    DropHorizontally_addFriend_icon.style.color = "var(--white)";
    DropHorizontally_friendsList_icon.style.color = "var(--black)";
  }
  return (
    <section
      id="DropHorizontally_article"
      style={{
        order: "1",
        gap: "50px",
        justifyContent: "center",
        backgroundColor: "var(--special_black)",
        padding: "15px",
        fontSize: "20pt",
        color: "var(--white)",
      }}
      className="fr"
    >
      <i
        class="fas fa-user-friends"
        id="DropHorizontally_friendsList_icon"
        onClick={showFriendList}
        style={{ color: "var(--black)" }}
      ></i>
      <i
        class="fas fa-user-plus"
        id="DropHorizontally_addFriend_icon"
        onClick={showAddFriend}
      ></i>
    </section>
  );
};

export default DropHorizontally;
