//...........import..................
import React from "react";
// import { Route } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";

//........import CSS...........
import "./App.css";
import "./Footer/footer.css";
import "./Header/header.css";
import "./Main/Friends/AddFriend/add_friend.css";
import "./Main/Posts/posts.css";
import "./Main/main.css";
import "./Main/Friends/friends.css";
import "./Header/Search/search.css";
import "./Header/Logo/logo.css";
import "./Header/Nav/Notifications/notifications.css";
import "./Header/Nav/nav.css";
import "./Main/Posts/InputPost/inputPosts.css";
import "./Main/Posts/MountPosts/mount_posts.css";
import "./Header/Nav/Menu/menu.css";
import "./Main/Friends/FriendsList/friendslist.css";
import "./Main/Friends/Chat/chat.css";
//...........component..................
class App extends React.Component {
  //..........states...........
  constructor(props) {
    super(props);
    this.state = {
      my_id: JSON.parse(sessionStorage.getItem("state")).my_id,
      username: JSON.parse(sessionStorage.getItem("state")).username,
      firstname: JSON.parse(sessionStorage.getItem("state")).firstname,
      lastname: JSON.parse(sessionStorage.getItem("state")).lastname,
      dob: JSON.parse(sessionStorage.getItem("state")).dob,
      token: JSON.parse(sessionStorage.getItem("state")).token,
      isConnected: JSON.parse(sessionStorage.getItem("state")).isConnected,
      notes: JSON.parse(sessionStorage.getItem("state")).notes,
      chat: null,
      posts: null,
      friends: JSON.parse(sessionStorage.getItem("state")).friends,
      friend_requests: JSON.parse(sessionStorage.getItem("state"))
        .friend_requests,
      app_is_loading: false,
      friend_target: null,
      notifications: JSON.parse(sessionStorage.getItem("state")).notifications,
      server_answer: null,
      friendID_selected: null,
    };
  }
  ////////////////////////////////////////Variables//////////////
  selected_friend_old_conversation = [];

  /////////////////////////////////////////////////////Lifecycle//////////////////////////
  componentDidMount() {
    ///////////////////
    // let source = new EventSource("URL");
    // source.onmessage = function (event) {
    //   event.data;
    // };
    /////////////////
    this.dbUpdate_user_connected();
    this.setState({
      my_id: JSON.parse(sessionStorage.getItem("state")).my_id,
      username: JSON.parse(sessionStorage.getItem("state")).username,
      firstname: JSON.parse(sessionStorage.getItem("state")).firstname,
      lastname: JSON.parse(sessionStorage.getItem("state")).lastname,
      dob: JSON.parse(sessionStorage.getItem("state")).dob,
      token: JSON.parse(sessionStorage.getItem("state")).token,
      isConnected: JSON.parse(sessionStorage.getItem("state")).isConnected,
      notes: JSON.parse(sessionStorage.getItem("state")).notes,
      friends: JSON.parse(sessionStorage.getItem("state")).friends,
      friend_requests: JSON.parse(sessionStorage.getItem("state"))
        .friend_requests,
      app_is_loading: false,
      friend_target: null,
      notifications: JSON.parse(sessionStorage.getItem("state")).notifications,
    });
    this.prepareMyChat();
    this.createChatSpace();
    setInterval(() => {
      this.updateUserInfo();
    }, 1000);
  }
  componentDidUpdate() {
    console.log(this.state);

    if (this.state.isConnected === false) {
      this.dbUpdate_user_connected();
    }
    this.RetrievingMySendingMessages();
    this.RetrievingMyPosts();
  }

  //////////////////////////PREPARE MY CHAT////////////////////////////////
  prepareMyChat = () => {
    let url =
      "https://backendstep1.herokuapp.com/api/user/addNew/" + this.state.my_id;
    let options = {
      method: "PUT",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
    };
    let req = new Request(url, options);
    fetch(req);
  };
  createChatSpace = () => {
    let url =
      "https://backendstep1.herokuapp.com/api/chat/addNew/" + this.state.my_id;
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
    };
    let req = new Request(url, options);
    fetch(req);
  };

  //////////////////////////Posting POSTS////////////////////////////////
  postingPost = () => {
    let url =
      "https://backendstep1.herokuapp.com/api/user/posts/" + this.state.my_id;
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note: document.getElementById("InputPost_textarea").value,
        category: document.getElementById("InputPost_category").value,
        subject: document.getElementById("InputPost_subject").value,
        reference: document.getElementById("InputPost_resourse").value,
        page_num: document.getElementById("InputPost_page").value,
      }),
    };
    let req = new Request(url, options);
    fetch(req).then((result) => {
      if (result.status === 201) {
        document.getElementById("InputPost_textarea").value = "";
        document.getElementById("InputPost_category").value = "";
        document.getElementById("InputPost_subject").value = "";
        document.getElementById("InputPost_resourse").value = "";
        document.getElementById("InputPost_page").value = "";
      } else {
        document.getElementById("server_answer_message").textContent =
          "Posting failed. Please make sure you select a category and/or a subject for your note";

        document.getElementById("server_answer").style.width = "fit-content";
        setTimeout(() => {
          document.getElementById("server_answer").style.width = "0";
          document.getElementById("server_answer_message").textContent = "";
        }, 5000);
      }
    });
  };

  ////////////////////////// RetrievingMyPosts////////////////////////////////
  posts_ID = [];
  RetrievingMyPosts = () => {
    if (this.state.posts) {
      let ul = document.getElementById("MountPosts_content_container");
      for (var i = 0; i < this.state.posts.length; i++) {
        if (this.state.posts[i]._id !== this.posts_ID[i]) {
          let p = document.createElement("p");
          let li = document.createElement("li");
          p.textContent = this.state.posts[i].note;
          li.appendChild(p);
          ul.appendChild(li);
        }
        this.posts_ID[i] = this.state.posts[i]._id;
      }
    }
  };

  //////////////////////////RECEIVE MESSAGE////////////////////////////////
  messages = [];
  RetrievingMySendingMessages = () => {
    if (this.state.chat) {
      let ul = document.getElementById("Chat_messages");
      for (var i = 0; i < this.state.chat.conversation.length; i++) {
        if (
          this.state.chat.conversation[i]._id === this.state.friendID_selected
        ) {
          if (this.state.chat.conversation[i].message !== this.messages[i]) {
            console.log(this.state.chat.conversation[i].message);
            document
              .getElementById("Chat_messages")
              .scrollBy(
                0,
                document.getElementById("Chat_messages").scrollHeight
              );

            if (this.state.chat.conversation[i].destination === "sent") {
              let p = document.createElement("p");
              let li = document.createElement("li");
              let div = document.createElement("div");
              p.textContent = this.state.chat.conversation[i].message;
              li.setAttribute("class", "sentMessagesLI");
              li.appendChild(p);
              div.setAttribute("class", "sentMessagesDIV fc");
              div.appendChild(li);
              ul.appendChild(div);
            }
            if (this.state.chat.conversation[i].destination === "received") {
              let p = document.createElement("p");
              let li = document.createElement("li");
              let div = document.createElement("div");
              p.textContent = this.state.chat.conversation[i].message;
              li.setAttribute("class", "receivedMessagesLI");
              li.appendChild(p);
              div.setAttribute("class", "receivedMessagesDIV fc");
              div.appendChild(li);
              ul.appendChild(div);
            }
            this.messages[i] = this.state.chat.conversation[i].message;
          }
        }
      }
    }
  };

  //////////////////////////SEND MESSAGE TO FRIEND'S Chat////////////////////////////////
  sendToMeMessage = () => {
    let url =
      "https://backendstep1.herokuapp.com/api/chat/sendToMe/" +
      this.state.my_id;
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: this.state.friendID_selected,
        message: document.getElementById("Chat_textarea_input").value,
        destination: "sent",
      }),
    };
    let req = new Request(url, options);
    fetch(req).then((result) => {
      if (result.status === 201) {
        document.getElementById("Chat_textarea_input").value = "";
      }
    });
  };
  //////////////////////////SEND MESSAGE TO FRIEND'S Chat////////////////////////////////
  sendToThemMessage = () => {
    let url =
      "https://backendstep1.herokuapp.com/api/chat/sendToFriend/" +
      this.state.friendID_selected;
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: this.state.my_id,
        message: document.getElementById("Chat_textarea_input").value,
        destination: "received",
      }),
    };
    let req = new Request(url, options);
    fetch(req).then((result) => {
      if (result.status === 201) {
        document.getElementById("Chat_textarea_input").value = "";
      }
    });
  };
  ////////////////////////ACCEPT FRIEND/////////////////////////////////////////////

  acceptFriend = (friend) => {
    document.getElementById(friend.id).style.backgroundColor = "var(--black)";
    document.getElementById("server_answer_message").textContent = "Adding ...";
    document.getElementById("server_answer").style.width = "fit-content";
    let url =
      "https://backendstep1.herokuapp.com/api/user/acceptFriend/" +
      this.state.my_id +
      "/" +
      friend.id;
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
    };
    let req = new Request(url, options);
    fetch(req).then((response) => {
      if (response.status === 201) {
        document.getElementById("server_answer_message").textContent =
          "You're now friends!";

        let url =
          "https://backendstep1.herokuapp.com/api/user/editUserInfo/" +
          this.state.my_id +
          "/" +
          friend.id;
        let options = {
          method: "PUT",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + this.state.token,
            "Content-Type": "application/json",
          },
        };
        let req = new Request(url, options);
        fetch(req).then((response) => {
          if (response.ok) {
            setTimeout(() => {
              document.getElementById("server_answer").style.width = "0";
              document.getElementById("server_answer_message").textContent = "";
            }, 5000);
            document.getElementById(friend.id).parentElement.style.display =
              "none";
          }
          console.log(response.json());
        });
      }
      if (response.status === 409) {
        document.getElementById("server_answer_message").textContent =
          "You're already friends!";
        setTimeout(() => {
          document.getElementById("server_answer").style.width = "0";
          document.getElementById("server_answer_message").textContent = "";
        }, 5000);
        document.getElementById(friend.id).parentElement.style.display = "none";
      }
    });
  };
  ////////////////////////Decline Request/////////////////////////////////////////////

  makeNotificationsRead = (friend) => {
    let url =
      "https://backendstep1.herokuapp.com/api/user/editUserInfo/" +
      this.state.my_id +
      "/" +
      friend.id;

    let options = {
      method: "PUT",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
    };
    let req = new Request(url, options);
    fetch(req).then((response) => {
      document.getElementById(friend.id).style.backgroundColor = "var(--black)";
      if (response.status === 200) {
        document.getElementById(friend.id).parentElement.style.display = "none";
        document.getElementById("server_answer").style.width = "fit-content";
        document.getElementById("server_answer_message").textContent = "Done!";
        setTimeout(() => {
          document.getElementById("server_answer").style.width = "0";
          document.getElementById("server_answer_message").textContent = "";
        }, 5000);
      }
    });
  };
  ////////////////////////ADD FRIEND/////////////////////////////////////////////

  addFriend = (friend_username) => {
    let url =
      "https://backendstep1.herokuapp.com/api/user/addFriend/" +
      friend_username;
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.my_id,
        message:
          this.state.firstname +
          " " +
          this.state.lastname +
          " wants to add you as a friend",
      }),
    };
    let req = new Request(url, options);
    fetch(req).then((response) => {
      if (response.status === 201) {
        return response.json().then((result) => {
          document.getElementById("server_answer").style.width = "fit-content";
          document.getElementById("server_answer_message").textContent =
            result.message;
          setTimeout(() => {
            document.getElementById("server_answer").style.width = "0";
            document.getElementById("server_answer_message").textContent = "";
          }, 5000);
        });
      } else {
        document.getElementById("server_answer").style.width = "fit-content";
        document.getElementById("server_answer_message").textContent =
          "Request failed";
        setTimeout(() => {
          document.getElementById("server_answer").style.width = "0";
          document.getElementById("server_answer_message").textContent = "";
        }, 5000);
      }
    });
  };
  ////////////////////////SEARCH USER/////////////////////////
  searchUsers = (user_target) => {
    let url =
      "https://backendstep1.herokuapp.com/api/user/searchUsers/" + user_target;
    let options = {
      method: "GET",
      mode: "cors",
    };
    let req = new Request(url, options);
    fetch(req)
      .then((results) => {
        return results.json(results);
      })
      .then((users) => {
        for (var i = 0; i < users.length; i++) {
          if (this.state.friends.length > 0) {
            for (var j = 0; j < this.state.friends.length; j++) {
              if (users[i]._id !== this.state.my_id) {
                if (users[i]._id !== this.state.friends[j]._id) {
                  let p = document.createElement("p");
                  let li = document.createElement("li");
                  let ul = document.getElementById(
                    "AddFriend_addFriend_results"
                  );
                  let icon = document.createElement("i");
                  p.textContent =
                    users[i].info.firstname + " " + users[i].info.lastname;
                  li.appendChild(p);
                  li.setAttribute("id", users[i].info.username);
                  li.setAttribute("class", "fr");

                  icon.setAttribute("class", " fas fa-user-plus");
                  icon.addEventListener("click", () => {
                    this.addFriend(li.id);
                  });
                  li.appendChild(icon);
                  ul.appendChild(li);
                } else {
                  let p = document.createElement("p");
                  let p2 = document.createElement("p");
                  let li = document.createElement("li");
                  let ul = document.getElementById(
                    "AddFriend_addFriend_results"
                  );
                  p.textContent =
                    users[i].info.firstname + " " + users[i].info.lastname;
                  p2.textContent = "already friends";
                  li.appendChild(p);
                  li.appendChild(p2);
                  li.setAttribute("id", users[i].info.username);
                  li.setAttribute("class", "fr");
                  ul.appendChild(li);
                }
              }
            }
          } else {
            if (users[i]._id !== this.state.my_id) {
              let p = document.createElement("p");
              let li = document.createElement("li");
              let ul = document.getElementById("AddFriend_addFriend_results");
              let icon = document.createElement("i");
              p.textContent =
                users[i].info.firstname + " " + users[i].info.lastname;
              li.appendChild(p);
              li.setAttribute("id", users[i].info.username);
              li.setAttribute("class", "fr");

              icon.setAttribute("class", " fas fa-user-plus");
              icon.addEventListener("click", () => {
                this.addFriend(li.id);
              });
              li.appendChild(icon);
              ul.appendChild(li);
            }
          }
        }
      });
  };

  //////////////////////////////BUILD FRIENDS LIST////////////////
  app_friends = [];

  buildFriendsList = () => {
    for (var i = 0; i < this.state.friends.length; i++) {
      //For every friend
      if (this.app_friends[i] !== this.state.friends[i]._id) {
        //If a friend is new to the app add it to the friends list with respect to the online status and to the app memory
        this.app_friends[i] = this.state.friends[i]._id;
        let p = document.createElement("p");
        let li = document.createElement("li");
        let ul = document.getElementById("FriendsList_friends_list");
        let icon = document.createElement("i");
        console.log(this.app_friends.length);

        p.textContent =
          this.state.friends[i].info.firstname +
          " " +
          this.state.friends[i].info.lastname;
        p.setAttribute("id", [i]);
        li.appendChild(p);
        li.setAttribute("id", this.state.friends[i]._id);
        li.addEventListener("click", () => {
          this.get_current_friend_chat_id(li.id);
          document.getElementById("DropHorizontally_article").style.display =
            "none";
        });
        li.setAttribute("class", "fr");
        li.setAttribute("title", this.state.friends[i].info.firstname);
        icon.setAttribute("id", "online_icon" + this.state.friends[i]._id);
        icon.setAttribute("class", "fas fa-circle");
        li.appendChild(icon);
        ul.appendChild(li);
        if (this.state.friends[i].status.isConnected) {
          icon.style.color = "#32cd32";
        } else {
          icon.style.color = "var(--black)";
        }
      }
      if (this.app_friends[i] === this.state.friends[i]._id) {
        // if we already have this friend in the memory app just check their online status and change it
        if (this.state.friends[i].status.isConnected) {
          document.getElementById(
            "online_icon" + this.state.friends[i]._id
          ).style.color = "#32cd32";
        } else {
          document.getElementById(
            "online_icon" + this.state.friends[i]._id
          ).style.color = "var(--black)";
        }
      }
    }
  };

  ////////////////////////////Select friend id to chat //////////////////////////////////////////////////
  get_current_friend_chat_id = (friendID) => {
    this.setState({
      friendID_selected: friendID,
    });
    document.getElementById("Chat_goback_icon").style.display = "inline";
    document.getElementById("Chat_article").style.height = "100%";
    document.getElementById("FriendsList_article").style.height = "0";
    document.getElementById(
      "Chat_title_text"
    ).textContent = document.getElementById(friendID).title;
  };
  ////////////////////////////Update State//////////DONE/////////////////////
  updateUserInfo = () => {
    let url =
      "https://backendstep1.herokuapp.com/api/user/update/" + this.state.my_id;
    let req = new Request(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.token,
      },
    });
    fetch(req)
      .then((response) => {
        if (response.status === 200) {
          return response.json(response);
        }
      })
      .then((jsonData) => {
        this.setState({
          notes: jsonData.notes,
          friends: jsonData.friends,
          friend_requests: jsonData.friend_requests,
          chat: jsonData.chat,
          posts: jsonData.posts,
          notifications: jsonData.notifications,
        });
      })
      .then(() => {
        this.buildFriendsList();
        this.buildNotifications();
      })
      .catch((err) => {
        if (err.message === "Cannot read property 'credentials' of null")
          console.log("Error", err.message);
      });
  };

  ////////////////////////////////////BUILD NOTIFICATIONS////////////////////////
  buildNotifications = () => {
    let notificaitons_array = [];
    let ul = document.getElementById("Notifications_dropMenu_container");
    this.state.notifications.forEach((notification) => {
      if (notification.status !== "read") {
        document.getElementById("i_bell_open").style.color = "yellow";
        document.getElementById("i_bell_close").style.color = "yellow";
        ul.innerHTML = "";

        let p = document.createElement("p");
        let li = document.createElement("li");
        let div = document.createElement("div");
        let decline_icon = document.createElement("i");
        let accept_icon = document.createElement("i");

        accept_icon.addEventListener("click", () => {
          this.acceptFriend(notification);
        });
        decline_icon.addEventListener("click", () => {
          this.makeNotificationsRead(notification);
        });
        decline_icon.setAttribute("class", "fas fa-times");
        accept_icon.setAttribute("class", "fas fa-user-check");
        accept_icon.setAttribute("id", "accept_icon" + notification.id);
        decline_icon.setAttribute("id", "decline_icon" + notification.id);

        p.textContent = notification.message;
        div.setAttribute("class", "fr");
        div.style.justifyContent = "space-between";
        li.setAttribute("id", notification.id);
        li.appendChild(p);
        div.appendChild(li);
        div.appendChild(decline_icon);
        div.appendChild(accept_icon);
        ul.appendChild(div);
        notificaitons_array.push(notification);
      } else {
        document.getElementById("i_bell_open").style.color = "var(--white)";
        document.getElementById("i_bell_close").style.color = "var(--white)";
      }
    });
  };

  ////////////////////////////////////////////////////UPDATE isConnect on databae////////////////////////////////
  dbUpdate_user_connected = () => {
    let url =
      "https://backendstep1.herokuapp.com/api/user/connection/" +
      this.state.my_id;
    let options = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "status.isConnected": this.state.isConnected,
      }),
    };

    let req = new Request(url, options);
    fetch(req)
      .then((response) => {
        if (response.ok) {
          if (this.state.isConnected === false) {
            sessionStorage.removeItem("state");
            window.location.reload();
          }
          return response.json();
        } else {
          throw new Error("bad Http");
        }
      })
      .catch((err) => {
        console.log("error:", err.message);
      });
  };

  //.....loader function..........
  loader = () => {
    return (
      <div
        style={{
          fontSize: "20pt",
          display: "flex",
          position: "fixed",
          top: "0",
          bottom: "0",

          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          zIndex: "100",
        }}
      >
        <img src="/img/loader.gif" alt="" width="70px" />
      </div>
    );
  };

  /////////////////////////Log out//////////////////////
  logOut = () => {
    this.setState({
      isConnected: false,
    });
  };

  //.....Reander Login HTML..........
  render() {
    return (
      <div id="app_page" className="fc">
        <Header
          state={this.state}
          logOut={this.logOut}
          acceptFriend={this.acceptFriend}
          type={this.props.type}
        />
        <Main
          searchUsers={this.searchUsers}
          addFriend={this.addFriend}
          acceptFriend={this.acceptFriend}
          state={this.state}
          sendToMeMessage={this.sendToMeMessage}
          sendToThemMessage={this.sendToThemMessage}
          RetrievingMySendingMessages={this.RetrievingMySendingMessages}
          type={this.props.type}
          postingPost={this.postingPost}
        />
        <Footer />
        <div
          id="server_answer"
          onClick={() => {
            document.getElementById("server_answer").style.width = "0";
          }}
        >
          <h3 id="server_answer_message"></h3>
        </div>
      </div>
    );
  }
}
export default App;
