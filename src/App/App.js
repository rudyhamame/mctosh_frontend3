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
      friends: JSON.parse(sessionStorage.getItem("state")).friends,
      friend_requests: JSON.parse(sessionStorage.getItem("state"))
        .friend_requests,
      app_is_loading: false,
      friend_target: null,
      notifications: JSON.parse(sessionStorage.getItem("state")).notifications,
      server_answer: null,
    };
  }
  ////////////////////////////////////////Variables//////////////
  /////////////////////////////////////////////////////Lifecycle//////////////////////////
  componentDidMount() {
    console.log(this.state);
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
    setInterval(() => {
      this.updateUserInfo();
    }, 1000);
  }
  componentDidUpdate() {
    this.buildFriendsList();
    if (this.state.isConnected === false) {
      this.dbUpdate_user_connected();
    }
  }
  ////////////////////////ACCEPT FRIEND/////////////////////////////////////////////

  acceptFriend = (friend) => {
    document.getElementById(friend.id).style.backgroundColor = "var(--black)";
    document.getElementById("server_answer_message").textContent = "Adding ...";
    document.getElementById("server_answer").style.width = "20%";
    let url =
      "http://localhost:4000/api/user/acceptFriend/" +
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
          "http://localhost:4000/api/user/editUserInfo/" +
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
            }, 3000);
            document.getElementById(friend.id).parentElement.style.display =
              "none";
          }
          console.log(response.json());
        });
      }
    });
  };
  ////////////////////////Decline Request/////////////////////////////////////////////

  makeNotificationsRead = (friend) => {
    let url =
      "http://localhost:4000/api/user/editUserInfo/" +
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
        document.getElementById("server_answer").style.width = "20%";
        document.getElementById("server_answer_message").textContent = "Done!";
        setTimeout(() => {
          document.getElementById("server_answer").style.width = "0";
          document.getElementById("server_answer_message").textContent = "";
        }, 3000);
      }
    });
  };
  ////////////////////////ADD FRIEND/////////////////////////////////////////////

  addFriend = (friend_username) => {
    let url = "http://localhost:4000/api/user/addFriend/" + friend_username;
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
          document.getElementById("server_answer").style.width = "20%";
          document.getElementById("server_answer_message").textContent =
            result.message;
          setTimeout(() => {
            document.getElementById("server_answer").style.width = "0";
            document.getElementById("server_answer_message").textContent = "";
          }, 3000);
        });
      } else {
        document.getElementById("server_answer").style.width = "20%";
        document.getElementById("server_answer_message").textContent =
          "Request failed";
        setTimeout(() => {
          document.getElementById("server_answer").style.width = "0";
          document.getElementById("server_answer_message").textContent = "";
        }, 3000);
      }
    });
  };
  ////////////////////////SEARCH USER
  searchUsers = (user_target) => {
    let url = "http://localhost:4000/api/user/searchUsers/" + user_target;
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
      });
  };

  //////////////////////////////BUILD FRIENDS LIST////////////////
  friends = [];
  online_friends = [];
  buildFriendsList = () => {
    for (var i = 0; i < this.state.friends.length; i++) {
      if (
        this.friends[i] !== this.state.friends[i]._id &&
        this.online_friends[i] !== this.state.friends[i]._id
      ) {
        let p = document.createElement("p");
        let li = document.createElement("li");
        let ul = document.getElementById("FriendsList_friends_list");
        let icon = document.createElement("i");

        p.textContent =
          this.state.friends[i].info.firstname +
          " " +
          this.state.friends[i].info.lastname;
        p.setAttribute("id", [i]);
        li.appendChild(p);
        li.setAttribute("id", this.state.friends[i]._id);
        li.addEventListener("click", () => {});

        li.setAttribute("class", "fr");
        icon.setAttribute("class", "fas fa-circle");
        li.appendChild(icon);
        ul.appendChild(li);
        if (this.state.friends[i].status.isConnected) {
          this.online_friends[i] = this.state.friends[i]._id;
          icon.style.color = "#32cd32";
        } else {
          this.friends[i] = this.state.friends[i]._id;
          icon.style.color = "var(--black)";
        }
      }
    }
    if (
      this.friends.length + this.online_friends.length >
      this.state.friends.length
    ) {
      let ul = document.getElementById("FriendsList_friends_list");
      ul.innerHTML = "";
      this.friends = [];
      this.online_friends = [];

      for (i = 0; i < this.state.friends.length; i++) {
        if (
          this.friends[i] !== this.state.friends[i]._id &&
          this.online_friends[i] !== this.state.friends[i]._id
        ) {
          let p = document.createElement("p");
          let li = document.createElement("li");
          let icon = document.createElement("i");

          p.textContent =
            this.state.friends[i].info.firstname +
            " " +
            this.state.friends[i].info.lastname;
          p.setAttribute("id", [i]);
          li.appendChild(p);
          li.setAttribute("id", this.state.friends[i]._id);
          li.setAttribute("class", "fr");
          icon.setAttribute("class", "fas fa-circle");
          if (this.state.friends[i].status.isConnected === true) {
            icon.style.color = "#32cd32";
          } else {
            icon.style.color = "var(--black)";
          }
          li.appendChild(icon);
          ul.appendChild(li);
          this.friends[i] = this.state.friends[i]._id;
          if (this.state.friends[i].status.isConnected) {
            this.online_friends[i] = this.state.friends[i]._id;
            icon.style.color = "#32cd32";
          } else {
            this.friends[i] = this.state.friends[i]._id;
            icon.style.color = "var(--black)";
          }
        }
      }
    }
  };

  ////////////////////////////Update State//////////DONE/////////////////////
  updateUserInfo = () => {
    let url = "http://localhost:4000/api/user/update/" + this.state.my_id;
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
        if (response.status(304)) {
          console.log("non");
        }
      })
      .then((jsonData) => {
        this.setState({
          notes: jsonData.notes,
          friends: jsonData.friends,
          friend_requests: jsonData.friend_requests,
          notifications: jsonData.notifications,
        });
      })
      .then(() => {
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

  /////////////////////////////////////BUILDING CHAT////////////////////////////////
  // user_friends = [];
  // already_online_friends = [];
  // build_online_friendsList = () => {
  //   if (this.state.friend_requests.length !== 0) {
  //     let ul = document.getElementById("FriendsList_friends_list");
  //     let online_page = document.getElementById("online_page");
  //     let chat_page = document.getElementById("chat_page");

  //     for (var i = 0; i < this.user_friends.length; i++) {
  //       if (
  //         // this.user_friends[i].friend_connected === true &&
  //         this.already_online_friends[i] !== this.user_friends[i]._id
  //         // this.already_online_friends[i] !== "offline"
  //       ) {
  //         this.already_online_friends[i] = this.user_friends[i]._id;
  //         let p = document.createElement("p");
  //         let li = document.createElement("li");
  //         let div = document.createElement("div");
  //         let icon = document.createElement("i");
  //         p.textContent = this.user_friends[i].friend_firstname;
  //         li.appendChild(p);
  //         li.setAttribute("id", this.user_friends[i]._id);
  //         li.setAttribute("title", this.user_friends[i].friend_firstname);
  //         icon.setAttribute("class", "fas fa-circle");
  //         icon.setAttribute("id", "friend_status" + [i]);
  //         icon.style.color = "var(--green)";
  //         div.setAttribute("class", "fr");
  //         div.setAttribute("title", "unclicked");
  //         div.appendChild(li);
  //         div.appendChild(icon);
  //         p.setAttribute("id", "onlineFriend" + [i]);
  //         div.addEventListener("click", () => {
  //           if (div.title === "unclicked") {
  //             this.get_current_friend_chat_id(li.id);
  //             online_page.style.height = 0;
  //             chat_page.style.height = "100%";
  //           } else {
  //             this.get_current_friend_chat_id(null);
  //             // li.style.backgroundColor = "rgba(59, 57, 57, 0.836)";
  //           }
  //         });
  //         ul.appendChild(div);
  //       }
  //       if (
  //         this.user_friends[i].friend_connected === false &&
  //         this.already_online_friends[i] === this.user_friends[i]._id
  //       ) {
  //         let icon = document.getElementById("friend_status" + [i]);
  //         icon.style.color = "var(--black)";
  //         // document.getElementById("onlineFriend" + [i]).parentElement.remove();
  //         // this.already_online_friends.splice([i], 1, "offline");
  //       }
  //       if (
  //         this.user_friends[i].friend_connected === true &&
  //         this.already_online_friends[i] === this.user_friends[i]._id
  //         // && this.already_online_friends[i] === "offline"
  //       ) {
  //         // this.already_online_friends.splice([i], 1, this.user_friends[i]._id);
  //         // let p = document.createElement("p");
  //         // let li = document.createElement("li");
  //         // let div = document.createElement("div");
  //         // let i = document.createElement("i");
  //         // p.textContent = this.user_friends[i].friend_firstname;
  // li.appendChild(p);
  // li.setAttribute("id", this.user_friends[i]._id);
  // p.setAttribute("id", "onlineFriend" + [i]);
  // i.setAttribute("class", "fas fa-circle");
  // i.style.color = "var(--green)";
  // div.setAttribute("class", "fr");
  // div.appendChild(li);
  // div.appendChild(i);
  // ul.appendChild(div);
  // let icon = document.getElementById("friend_status" + [i]);
  // icon.style.color = "var(--green)";
  //       }
  //     }
  //   }
  // };
  //////////////////////////////////////////////////////////////////////////////////////
  get_current_friend_chat_id = (selected_online_friend) => {
    this.setState({
      online_friend_selected: selected_online_friend,
    });
  };

  ///////////////////////////getting messages///////////////////////////
  getting_specific_friend_messages = (friend) => {
    // let selected_friend_new_conversation = [];
    // let message_status = [];

    // this.state.chat.forEach((friend) => {
    //   if (friend.username === this.state.online_friend_selected) {
    //     // console.log(
    //     //   "my all new messages " + this.state.friend_chathistory.length
    //     // );
    //     selected_friend_new_conversation.push(friend.message);
    //     message_status.push(friend.status);
    //   }
    // });
    // // console.log(
    // //   "my new message for selected friend " +
    // //     selected_friend_new_conversation.length
    // // );

    // if (
    //   this.selected_friend_old_conversation.length !==
    //   selected_friend_new_conversation.length
    // ) {
    // ul.innerHTML = "";
    let ul = document.getElementById("chat_history");
    for (var i = 0; i < friend.chat.message.length; i++) {
      // if (selected_friend_new_conversation[i])
      if (friend.chat.status[i] === "sent:new") {
        let p = document.createElement("p");
        let li = document.createElement("li");
        let div = document.createElement("div");
        p.textContent = friend.chat.message[i];
        li.appendChild(p);
        div.appendChild(li);
        div.setAttribute("class", "fr");
        div.style.justifyContent = "flex-end";
        li.style.backgroundColor = "var(--blue)";
        li.style.width = "fit-content";
        p.style.textAlign = "right";
        ul.appendChild(div);
        li.scrollIntoView(true); // to scroll down
      }
      if (friend.chat.status[i] === "received:new") {
        let p = document.createElement("p");
        let li = document.createElement("li");
        let div = document.createElement("div");
        p.textContent = friend.chat.message[i];
        li.appendChild(p);
        div.appendChild(li);
        div.setAttribute("class", "fr");
        div.style.justifyContent = "flex-start";
        li.style.backgroundColor = "var(--green)";
        li.style.width = "fit-content";
        p.style.textAlign = "left";
        ul.appendChild(div);
        li.scrollIntoView(true); // to scroll down
      }

      // this.selected_friend_old_conversation = selected_friend_new_conversation;
      // console.log(
      //   "my old message for selected friend " +
      //     this.selected_friend_old_conversation.length
      // );
    }
  };

  ////////////////////////////////////////////////////UPDATE isConnect on databae////////////////////////////////
  dbUpdate_user_connected = () => {
    let url = "http://localhost:4000/api/user/connection/" + this.state.my_id;
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
        />
        <Main
          searchUsers={this.searchUsers}
          addFriend={this.addFriend}
          acceptFriend={this.acceptFriend}
          state={this.state}
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
