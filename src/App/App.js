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
import "./Main/Tasks/tasks.css";
import "./Main/Posts/posts.css";
import "./Main/main.css";
import "./Main/Greeting/greeting.css";
import "./Main/Friends/friends.css";

//...........component..................
class App extends React.Component {
  //..........states...........
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.authReport.id,
      username: this.props.authReport.username,
      firstname: this.props.authReport.firstname,
      lastname: this.props.authReport.lastname,
      dob: this.props.authReport.dob,
      already_online_friends: [],
      selected_friend_old_conversation: [],
      token: this.props.authReport.token,
      isConnected: true,
      notes: this.props.authReport.notes,
      friends: this.props.authReport.friends,
      friend_requests: this.props.authReport.friend_requests,
      app_is_loading: false,
      friend_target: null,
    };
  }
  ////////////////////////////////////////Variables//////////////

  /////////////////////////////////////////////////////Lifecycle//////////////////////////
  componentDidMount() {
    // this.dbUpdate_user_connected();
    this.updateUserInfo();
    setInterval(() => {
      this.updateUserInfo();
    }, 3000);

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
    this.build_online_friendsList();
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

  ////////////////////////////Update State//////////DONE/////////////////////
  updateUserInfo = () => {
    let url = "http://localhost:4000/api/user/update/" + this.state.username;
    let req = new Request(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: "Bearer" + " " + this.state.token,
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
        console.log(jsonData);
        this.setState({
          notes: jsonData.notes,
          friends: jsonData.friends,
          friend_requests: jsonData.friend_requests,
        });
      })
      .catch((err) => {
        if (err.message === "Cannot read property 'credentials' of null")
          console.log("Error", err.message);
      });
  };
  ////////////////////////ADD FRIEND/////////////////////////////////////////////
  addFriend = (friend_username) => {
    let url = "http://localhost:4000/api/user/addFriend/" + friend_username;
    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: "Bearer" + " " + this.state.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        username: this.state.username,
        accept: false,
      }),
    };
    let req = new Request(url, options);
    fetch(req).then((friend) => {
      console.log(friend);
    });
  };
  ////////////////////////////BUILDING FRIENDS///////////////////////////////
  // getFriendProfile_info = () => {
  //   let url =
  //     "http://localhost:4000/api/friend/get/profile/" +
  //     this.state.friend_target;
  //   let req = new Request(url, { method: "GET", mode: "cors" });
  //   fetch(req)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json(response);
  //       } else {
  //         throw new Error("BAD HTTP!");
  //       }
  //     })
  //     .then((jsonData) => {
  //       this.setState({
  //         friend_isTyping: jsonData.friend_isTyping,
  //       });
  //     })
  //     .catch((err) => {
  //       if (err.message === "Cannot read property 'credentials' of null")
  //         console.log("Error", err.message);
  //     });
  // };
  /////////////////////////////////////////////////////////////////////
  ////////////////////////////BUILDING FRIENDS///////////////////////////////
  // updateFriendInfo = () => {
  //   let url = "http://localhost:4000/api/friend/" + this.state.friend_id;

  //   let req_true = new Request(url, {
  //     method: "PUT",
  //     mode: "cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       friend_isTyping: true,
  //     }),
  //   });
  //   fetch(req_true)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json(response);
  //       } else {
  //         throw new Error("BAD HTTP!");
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.message === "Cannot read property 'credentials' of null")
  //         console.log("Error", err.message);
  //     });

  //   let x = setTimeout(function () {
  //     let req_false = new Request(url, {
  //       method: "PUT",
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         friend_isTyping: false,
  //       }),
  //     });
  //     fetch(req_false)
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json(response);
  //         } else {
  //           throw new Error("BAD HTTP!");
  //         }
  //       })
  //       .catch((err) => {
  //         if (err.message === "Cannot read property 'credentials' of null")
  //           console.log("Error", err.message);
  //       });
  //   }, 3000);
  // };
  /////////////////////////////////////////////////////////////////////
  // build_friendsINFO = () => {
  //   fetch("http://localhost:4000/api/build/friends/" + this.state.user_id, {
  //     method: "GET",
  //     mode: "cors",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       this.user_friends = data;
  //     });
  // };

  /////////////////////////////////////BUILDING CHAT////////////////////////////////
  build_online_friendsList = () => {
    if (this.state.friends.length !== 0) {
      let ul = document.getElementById("users");
      let online_page = document.getElementById("online_page");
      let chat_page = document.getElementById("chat_page");

      for (var i = 0; i < this.user_friends.length; i++) {
        if (
          // this.user_friends[i].friend_connected === true &&
          this.already_online_friends[i] !== this.user_friends[i]._id
          // this.already_online_friends[i] !== "offline"
        ) {
          this.already_online_friends[i] = this.user_friends[i]._id;
          let p = document.createElement("p");
          let li = document.createElement("li");
          let div = document.createElement("div");
          let icon = document.createElement("i");
          p.textContent = this.user_friends[i].friend_firstname;
          li.appendChild(p);
          li.setAttribute("id", this.user_friends[i]._id);
          li.setAttribute("title", this.user_friends[i].friend_firstname);
          icon.setAttribute("class", "fas fa-circle");
          icon.setAttribute("id", "friend_status" + [i]);
          icon.style.color = "var(--green)";
          div.setAttribute("class", "fr");
          div.setAttribute("title", "unclicked");
          div.appendChild(li);
          div.appendChild(icon);
          p.setAttribute("id", "onlineFriend" + [i]);
          div.addEventListener("click", () => {
            if (div.title === "unclicked") {
              this.get_current_friend_chat_id(li.id);
              online_page.style.height = 0;
              chat_page.style.height = "100%";
            } else {
              this.get_current_friend_chat_id(null);
              // li.style.backgroundColor = "rgba(59, 57, 57, 0.836)";
            }
          });
          // ul.appendChild(div);
        }
        if (
          this.user_friends[i].friend_connected === false &&
          this.already_online_friends[i] === this.user_friends[i]._id
        ) {
          let icon = document.getElementById("friend_status" + [i]);
          icon.style.color = "var(--black)";
          // document.getElementById("onlineFriend" + [i]).parentElement.remove();
          // this.already_online_friends.splice([i], 1, "offline");
        }
        if (
          this.user_friends[i].friend_connected === true &&
          this.already_online_friends[i] === this.user_friends[i]._id
          // && this.already_online_friends[i] === "offline"
        ) {
          // this.already_online_friends.splice([i], 1, this.user_friends[i]._id);
          // let p = document.createElement("p");
          // let li = document.createElement("li");
          // let div = document.createElement("div");
          // let i = document.createElement("i");
          // p.textContent = this.user_friends[i].friend_firstname;
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
        }
      }
    }
  };
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

  ///////////////////////////////BuildData (All)////////////////////////////////////////////////////////
  buildData = (jsonData, goal, page) => {
    let df = new DocumentFragment();
    switch (page) {
      case "Todo":
        for (var i = 0; i < jsonData.length; i++) {
          //........................................p....................................
          let task_p = document.createElement("p");
          let deadline_p = document.createElement("p");

          task_p.setAttribute("id", "task_p" + i);
          deadline_p.setAttribute("id", "deadline_p" + i);

          task_p.textContent = "Task: " + jsonData[i].task;

          let dbDate = String(jsonData[i].deadline);
          let frontDate = dbDate.split("T");
          deadline_p.textContent = "Deadline: " + frontDate[0];

          //........................................li....................................

          let todo_li = document.createElement("li");
          todo_li.appendChild(task_p);
          if (goal !== "search_by_today") {
            todo_li.appendChild(deadline_p);
          }
          todo_li.setAttribute("id", "todo_li" + i);
          df.appendChild(todo_li);

          //........................................delete/edit icons....................................
          if (goal !== "search_by_today") {
            let divIcons = document.createElement("div");
            let deleteIcon = document.createElement("i");
            let editIcon = document.createElement("i");

            divIcons.setAttribute("id", String(jsonData[i]._id));
            divIcons.setAttribute("class", "div_icons");

            deleteIcon.setAttribute("id", "todo_delete" + i);
            editIcon.setAttribute("id", "todo_edit" + i);
            editIcon.setAttribute("class", "fas fa-edit");
            deleteIcon.setAttribute("class", "fas fa-eraser");
            editIcon.addEventListener("click", () =>
              this.fetchData(editIcon.id, "put", "", "", page)
            );
            deleteIcon.addEventListener("click", () =>
              this.fetchData(deleteIcon.id, "delete", "", "", page)
            );

            divIcons.appendChild(deleteIcon);
            divIcons.appendChild(editIcon);
            todo_li.appendChild(divIcons);
          }
        }
        //........................................ul appending....................................
        if (goal !== "search_by_today") {
          let todo_ul = document.getElementById("ul_table_todoaside");
          todo_ul.innerHTML = "";
          todo_ul.appendChild(df);
        } else {
          let ol_table_homecontent = document.getElementById(
            "ol_table_homecontent"
          );
          ol_table_homecontent.innerHTML = "";
          ol_table_homecontent.appendChild(df);
        }

        break;

      case "BiochemMolbio":
        for (var i = 0; i < jsonData.length; i++) {
          //........................................p....................................
          let note_p = document.createElement("p");
          let category_p = document.createElement("p");
          let subject_p = document.createElement("p");
          let textbook_p = document.createElement("p");
          let page_p = document.createElement("p");
          let date_p = document.createElement("p");

          note_p.setAttribute("id", "note_p" + i);
          category_p.setAttribute("id", "category_p" + i);
          subject_p.setAttribute("id", "subject_p" + i);
          textbook_p.setAttribute("id", "textbook_p" + i);
          page_p.setAttribute("id", "page_p" + i);
          date_p.setAttribute("id", "date_p" + i);

          category_p.textContent = "Category: " + jsonData[i].category;
          subject_p.textContent = "Subject: " + jsonData[i].subject;
          textbook_p.textContent =
            "Textbook: " + jsonData[i].textbook + ", Page. " + jsonData[i].page;
          note_p.textContent = "Note: " + jsonData[i].notes;

          let dbDate = String(jsonData[i].date);
          let frontDate = dbDate.split("T");
          date_p.textContent = "Date added: " + frontDate[0];

          //........................................li....................................

          let note_li = document.createElement("li");
          note_li.appendChild(category_p);
          note_li.appendChild(subject_p);
          note_li.appendChild(textbook_p);
          note_li.appendChild(date_p);
          note_li.appendChild(note_p);

          note_li.setAttribute("id", "note_li" + i);
          df.appendChild(note_li);

          //........................................delete/edit icons....................................
          let divIcons = document.createElement("div");
          let deleteIcon = document.createElement("i");
          let editIcon = document.createElement("i");

          divIcons.setAttribute("id", String(jsonData[i]._id));
          divIcons.setAttribute("class", "div_icons");

          deleteIcon.setAttribute("id", "notes_delete" + i);
          editIcon.setAttribute("id", "notes_edit" + i);
          editIcon.setAttribute("class", "fas fa-edit");
          deleteIcon.setAttribute("class", "fas fa-eraser");
          editIcon.addEventListener("click", () =>
            this.fetchData(editIcon.id, "put", "", "", page)
          );
          deleteIcon.addEventListener("click", () =>
            this.fetchData(deleteIcon.id, "delete", "", "", page)
          );
          divIcons.appendChild(deleteIcon);
          divIcons.appendChild(editIcon);
          note_li.appendChild(divIcons);
          let hr = document.createElement("hr");
          note_li.appendChild(hr);
        }
        //...........ul appending.................
        let note_ul = document.getElementById("ol_notes_content");
        note_ul.innerHTML = "";
        note_ul.appendChild(df);
        break;
    }
  };

  ////////////////////////////////////Fetch DATA (ALL)///////////////////////////////////////
  fetchData = (fetchInfo, method_type) => {
    let fetch_requirements;
    switch (method_type) {
      case "GET":
        fetch_requirements = {
          req: {
            url: fetchInfo.url + fetchInfo.user_id,
            options: {
              method: fetchInfo.method,
              mode: "cors",
            },
          },
        };
        break;
      case "POST":
        fetch_requirements = {
          req: {
            url: fetchInfo.url + this.state.user_id,
            options: {
              method: fetchInfo.method,
              mode: "cors",
              headers: fetchInfo.headers,
              body: JSON.stringify(fetchInfo.body),
            },
          },
        };
        break;
      case "DELETE":
      case "PUT":
        fetch_requirements = {
          req: {
            url: fetchInfo.url + this.state.user_id + fetchInfo.otherID,
            options: {
              method: fetchInfo.method,
              mode: "cors",
              headers: fetchInfo.headers,
              body: JSON.stringify(fetchInfo.body),
            },
          },
        };
        break;
    }
    fetch(fetch_requirements.req.url, fetch_requirements.req.options)
      .then((response) => response.json())
      .then((data) => {
        this.friends_list.push(data.first_name);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // .then((response) => {
  // if (method_type === "get") {
  //   this.buildData(response, goal, page);
  // } else {
  //   // this.setState({
  //   //   afterFetch_refresher: Math.random,
  //   // });
  // }
  // })

  //..............Loader Working..........
  // //to get date now for search_by_today goal
  // let today = new Date();
  // let date = today.getDate();
  // let month = today.getMonth() + 1;
  // let year = today.getFullYear();
  // let real_today = year + "-" + month + "-" + date; //time to be used as NOW
  // //to build options
  // let url;
  // let options;
  // let used_targetID; //for id that is needed for DELETE&PUT
  // let params = params;
  // //.....................for Todo..............
  // let task_input_ID = document.getElementById("input_task_todoaside"); //for PUT and POST method
  // let deadline_input_ID = document.getElementById("input_deadline_todoaside"); //for PUT and POST method
  // let deadline_search = new Date(search_deadline_value); //for search by deadline goal
  // //.....................for Todo..............
  // let note_input_ID = document.getElementById("input_note_notes"); //for PUT and POST method
  // let category_input_ID = document.getElementById("input_category_notes"); //for PUT and POST method
  // let subject_input_ID = document.getElementById("input_subject_notes"); //for PUT and POST method
  // let textbook_input_ID = document.getElementById("input_textbook_notes"); //for PUT and POST method
  // let page_input_ID = document.getElementById("input_page_notes"); //for PUT and POST method
  // //.....................for BiochemMolbio............
  // //Deciding which route it will take depending on METHOD_TYPE
  // switch (method_type) {
  //   case "put":
  //   case "post":
  //   case "delete":
  //     //Preparing fetching request
  //     let method;
  //     let body;
  //     switch (method_type) {
  //       case "put":
  //         used_targetID = document.getElementById(targetID).parentElement.id; //for id that is needed for DELETE&PUT
  //         url =
  //           "http://localhost:4000/api/" +
  //           page +
  //           "/" +
  //           used_targetID;
  //         method = "PUT";
  //         break;
  //       case "post":
  //         url = "http://localhost:4000/api/" + page;
  //         method = "POST";
  //         switch (page) {
  //           case "Todo":
  //             body = JSON.stringify({
  //               task: task_input_ID.value,
  //               deadline: deadline_input_ID.value,
  //             });
  //             break;
  //           case "BiochemMolbio":
  //             body = JSON.stringify({
  //               notes: note_input_ID.value,
  //               subject: subject_input_ID.value,
  //               category: category_input_ID.value,
  //               textbook: textbook_input_ID.value,
  //               page: page_input_ID.value,
  //             });
  //             break;
  //         }
  //         break;
  //       case "delete":
  //         used_targetID = document.getElementById(targetID).parentElement.id; //for id that is needed for DELETE&PUT
  //         url =
  //           "http://localhost:4000/api/" +
  //           page +
  //           "/" +
  //           used_targetID;
  //         method = "DELETE";
  //         break;
  //     }
  //     options = {
  //       method: method,
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: body,
  //     };
  //     break;
  //   case "get":
  //     switch (goal) {
  //       case "search_by_deadline":
  //         url =
  //           "http://localhost:4000/api/" +
  //           page +
  //           "/search?deadline=" +
  //           deadline_search;
  //         break;
  //       case "getAll":
  //         url = "http://localhost:4000/api/" + page;
  //         break;
  //       case "search_by_today":
  //         url =
  //           "http://localhost:4000/api/" +
  //           page +
  //           "/search?deadline=" +
  //           real_today;
  //         break;
  //     }
  //     options = { method: "GET", mode: "cors" };
  //     break;
  // }
  //After getting all the required information for fetching
  // let req = new Request(POSTmessenger.req.url, POSTmessenger.req.options); //request
  // fetch(req)
  //   .then((response) => response.json())
  //   .then((data) => console.log("Success:", data))
  // .then((response) => {
  //   if (method_type === "get") {
  //     this.buildData(response, goal, page);
  //   } else {
  //     // this.setState({
  //     //   afterFetch_refresher: Math.random,
  //     // });
  //   }
  // })
  // .catch((error) => {
  //   console.error("Error:", error);
  // });
  // };

  //////////////////////////////////////////////Logging out///////////////////////////////////
  logOut = () => {
    this.setState({ user_connected: false, friend_connected: false });
  };

  //////////////////////////////////////////////Redirect to Login///////////////////////////////////
  // redirectToLogin = () => {
  //   if (this.state.user_connected === false) {
  //     setTimeout(function () {
  //       sessionStorage.removeItem("user_connected", JSON.stringify(true));
  //       window.location.reload();
  //     }, 1000);
  //   }
  // };

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
        <Header state={this.state} logOut={this.logOut} />
        {/* <Main /> */}
        <Footer
          fetchData={this.fetchData}
          friendsData={this.state.friendsData}
          addFriend={this.addFriend}
        />
      </div>
    );
  }
}
export default App;
