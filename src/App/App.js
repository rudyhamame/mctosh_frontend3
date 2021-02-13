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
      info: {
        my_id: this.props.authReport.my_id,
        username: this.props.authReport.username,
        firstname: this.props.authReport.firstname,
        lastname: this.props.authReport.lastname,
        dob: this.props.authReport.dob,
        token: this.props.authReport.token,
      },
      status: {
        isConnected: this.props.authReport.isConnected,
      },
      notes: this.props.authReport.notes,
      friends: this.props.authReport.friends,
      friend_requests: this.props.authReport.friend_requests,
      app_is_loading: false,
      friend_target: null,
      notifications: this.props.authReport.notifications,
      server_answer: null,
    };
  }
  ////////////////////////////////////////Variables//////////////
  /////////////////////////////////////////////////////Lifecycle//////////////////////////
  componentDidMount() {
    // this.dbUpdate_user_connected();
    // this.updateUserInfo();
    setInterval(() => {
      this.updateUserInfo();
    }, 3000);
    // setInterval(() => {
    //   this.update_time();
    // }, 1000);
    // if (this.state.friend_id !== null) {
    // this.dbUpdate_friend_connected();
    // this.setState({
    //   friend_id: JSON.parse(sessionStorage.getItem("profile_report"))
    //     .friend_id,
    //   friend_username: JSON.parse(sessionStorage.getItem("profile_report"))
    //     .friend_username,
    //   friend_firstname: JSON.parse(sessionStorage.getItem("profile_report"))
    //     .friend_firstname,
    //   friend_lastname: JSON.parse(sessionStorage.getItem("profile_report"))
    //     .friend_lastname,
    //   friend_connected: JSON.parse(
    //     sessionStorage.getItem("profile_report").friend_connected
    //   ),
    // });
    // }
  }
  componentDidUpdate() {
    // this.fetchData(null, "get", "getAll", null, "Todo");
    // this.fetchData(null, "get", "search_by_today", null, "Todo");
    // this.fetchData(null, "get", "getAll", null, "BiochemMolbio");
    // if (
    //   this.state.user_connected === false &&
    //   this.state.friend_connected === false
    // ) {
    //   this.dbUpdate_user_connected();
    //   this.dbUpdate_friend_connected();
    // }
    // if (this.state.friends !== null) this.dbUpdate_friend_connected();
    // this.build_online_friendsList();
    this.buildFriendsList();
    // if (this.state.friends !== []) this.getting_specific_friend_messages();
    // if (this.state.user_isTyping === true) {
    //   this.updateFriendInfo();
    // }
    // if (this.state.friend_isTyping === true) {
    //   this.getFriendProfile_info();
    // }
    // if (this.state.online_friend_selected !== null)
    //   console.log("check: " + this.state.friend_chathistory.length);
  }
  ////////////////////////ACCEPT FRIEND/////////////////////////////////////////////

  acceptFriend = (friend) => {
    let url =
      "http://localhost:4000/api/user/acceptFriend/" +
      this.state.info.my_id +
      "/" +
      friend.id;
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.info.token,
        "Content-Type": "application/json",
      },
    };
    let req = new Request(url, options);
    fetch(req).then((response) => {
      if (response.status === 201) {
        document.getElementById(friend.id).style.backgroundColor =
          "var(--black)";
        this.setState({
          server_answer: response.json().message,
        });
        let url =
          "http://localhost:4000/api/user/editUserInfo/" +
          this.state.info.my_id +
          "/" +
          friend.id;
        let options = {
          method: "PUT",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + this.state.info.token,
            "Content-Type": "application/json",
          },
        };
        let req = new Request(url, options);
        fetch(req)
          .then((response) => {
            console.log(response.json());
          })
          .then(() => {
            this.makeNotificationsRead();
          });
      }
    });
  };
  ////////////////////////Decline Request/////////////////////////////////////////////

  makeNotificationsRead = (friend) => {
    let url =
      "http://localhost:4000/api/user/editUserInfo/" +
      this.state.info.my_id +
      "/" +
      friend.id;

    let options = {
      method: "PUT",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.info.token,
        "Content-Type": "application/json",
      },
    };
    let req = new Request(url, options);
    fetch(req).then((response) => {
      document.getElementById(friend.id).style.backgroundColor = "var(--black)";
    });
  };
  ////////////////////////ADD FRIEND/////////////////////////////////////////////

  addFriend = (friend_username) => {
    let url = "http://localhost:4000/api/user/addFriend/" + friend_username;
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.info.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.info.my_id,
        message:
          this.state.info.firstname +
          " " +
          this.state.info.lastname +
          " wants to add you as a friend",
      }),
    };
    let req = new Request(url, options);
    fetch(req)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        document.getElementById("server_answer").style.width = "fit_content";
        document.getElementById("server_answer").style.padding = "20px";

        this.setState({
          server_answer: result.message,
        });
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
    let url = "http://localhost:4000/api/user/update/" + this.state.info.my_id;
    let req = new Request(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + this.state.info.token,
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
        let notificaitons_array = [];
        jsonData.notifications.forEach((notification) => {
          if (
            notification.status !== "read" &&
            notification.message !== notificaitons_array.message
          ) {
            notificaitons_array.push(notification);
          }
        });
        console.log(jsonData);

        this.setState({
          notes: jsonData.notes,
          friends: jsonData.friends,
          friend_requests: jsonData.friend_requests,
          notifications: notificaitons_array,
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
    let ul = document.getElementById("Notifications_dropMenu_container");
    ul.innerHTML = "";

    this.state.notifications.forEach((request) => {
      let p = document.createElement("p");
      let li = document.createElement("li");
      let div = document.createElement("div");
      let decline_icon = document.createElement("i");
      let accept_icon = document.createElement("i");

      accept_icon.addEventListener("click", () => {
        this.acceptFriend(request);
      });
      decline_icon.addEventListener("click", () => {
        this.makeNotificationsRead(request);
      });
      decline_icon.setAttribute("class", "fas fa-times");
      accept_icon.setAttribute("class", "fas fa-user-check");
      accept_icon.setAttribute("id", "accept_icon" + request.id);
      decline_icon.setAttribute("id", "decline_icon" + request.id);

      p.textContent = request.message;
      div.setAttribute("class", "fr");
      div.style.justifyContent = "space-between";
      li.setAttribute("id", request.id);
      li.appendChild(p);
      div.appendChild(li);
      div.appendChild(decline_icon);
      div.appendChild(accept_icon);
      ul.appendChild(div);
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
    let url = "http://localhost:4000/api/user/connection/" + this.state.user_id;
    let options = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_connected: this.state.user_connected,
      }),
    };

    let req = new Request(url, options);
    fetch(req)
      .then((response) => {
        if (response.ok) {
          if (
            this.state.user_connected === false &&
            this.state.friend_connected === false
          ) {
            sessionStorage.removeItem("auth_report");
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

  //////////////////////////////////////////////////PROFILE ONLINE//////////////////////////////
  dbUpdate_friend_connected = () => {
    let url =
      "http://localhost:4000/api/friend/connection/" + this.state.friend_id;
    let options = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        friend_connected: this.state.friend_connected,
      }),
    };

    let req = new Request(url, options);
    fetch(req)
      .then((response) => {
        if (response.ok) {
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
        <div id="server_answer">
          <h3>{this.state.server_answer}</h3>
        </div>
      </div>
    );
  }
}
export default App;
