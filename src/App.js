//...........import..................
import React from "react";
import "./App.css";
import Home from "./static_components/Home/Home";
import { Route, Switch } from "react-router-dom";
import Profile from "./static_components/Profile/Profile";
import Footer from "./static_components/Footer";
import Header from "./static_components/Header";

//........import CSS...........
import "./static_components/css/aside.css";
import "./static_components/css/footer.css";
import "./static_components/css/content.css";
import "./static_components/css/main.css";
import "./static_components/css/header.css";
import "./content_components/greeting/greeting.css";
import MenuAside from "./static_components/MenuAside";
import TodoAside from "./static_components/TodoAside";
import NotesAside from "./content_components/notes/NotesAside";
import Content from "./static_components/Content";

//...........component..................
class App extends React.Component {
  //..........states...........
  constructor(props) {
    super(props);
    this.state = {
      app: {
        is_loading: false,
      },
      me: {
        username: this.props.received_auth_report.username,
        user_id: this.props.received_auth_report.user_id,
        first_name: this.props.received_auth_report.first_name,
        last_name: this.props.received_auth_report.last_name,
        friends_IDlist: this.props.received_auth_report.friends_list,
      },

      friends: null,
      is_loggingin: this.props.received_auth_report.is_authorized,
    };
  }

  //////////////////////////////////////ELEMENTS IDs////////////////////////////////
  // state_updater = () => {
  //   fetch("https://backendstep1.herokuapp.com/user/" + this.state.me.user_id, {
  //     method: "GET",
  //     mode: "cors",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       this.setState({
  //         me: {
  //           username: data.username,
  //           user_id: data._id,
  //           first_name: data.first_name,
  //           last_name: data.last_name,
  //           friends_IDlist: data.friends_list,
  //           is_loggingin: data.is_loggingin,
  //         },
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  build_online_friendsList = () => {
    let users = document.getElementById("users");
    users.innerHTML = "";
    this.state.friends.forEach((online_friend) => {
      if (online_friend.is_loggingin) {
        let p = document.createElement("p");
        let li = document.createElement("li");
        p.textContent = online_friend.first_name;
        li.appendChild(p);
        users.appendChild(li);
      }
    });
  };

  build_friendsINFO = () => {
    let friends_list = [];
    this.state.me.friends_IDlist.forEach((friend) => {
      fetch("https://backendstep1.herokuapp.com/user/" + friend, {
        method: "GET",
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          friends_list.push({
            user_id: data._id,
            username: data.username,
            first_name: data.first_name,
            last_name: data.last_name,
            is_loggingin: data.is_loggingin,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .then(
          this.setState({
            friends: friends_list,
          })
        )
        .finally(() => {
          this.build_online_friendsList();
        });
    });
  };

  /////////////////////////////////////////////////////Lifecycle//////////////////////////
  componentDidMount() {
    // this.fetchData(null, "get", "getAll", null, "Todo");
    // this.fetchData(null, "get", "search_by_today", null, "Todo");
    // this.fetchData(null, "get", "getAll", null, "BiochemMolbio");
    this.dbUpdate_is_loggingin();
    this.build_friendsINFO();
    setInterval(this.build_friendsINFO, 5000); // runs every 5 seconds.
  }

  componentDidUpdate() {
    // this.fetchData(null, "get", "getAll", null, "Todo");
    // this.fetchData(null, "get", "search_by_today", null, "Todo");
    // this.fetchData(null, "get", "getAll", null, "BiochemMolbio");
    this.dbUpdate_is_loggingin();
  }

  ////////////////////////////////////////////////////UPDATE isConnect on databae////////////////////////////////
  dbUpdate_is_loggingin = () => {
    let url =
      "https://backendstep1.herokuapp.com/api/user/connection/" +
      this.state.me.user_id;
    let options = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_loggingin: this.state.is_loggingin,
      }),
    };

    let req = new Request(url, options);
    fetch(req)
      .then((response) => {
        if (response.ok) {
          if (this.state.is_loggingin === false) {
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
  //           "https://backendstep1.herokuapp.com/api/" +
  //           page +
  //           "/" +
  //           used_targetID;
  //         method = "PUT";
  //         break;
  //       case "post":
  //         url = "https://backendstep1.herokuapp.com/api/" + page;
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
  //           "https://backendstep1.herokuapp.com/api/" +
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
  //           "https://backendstep1.herokuapp.com/api/" +
  //           page +
  //           "/search?deadline=" +
  //           deadline_search;
  //         break;
  //       case "getAll":
  //         url = "https://backendstep1.herokuapp.com/api/" + page;
  //         break;
  //       case "search_by_today":
  //         url =
  //           "https://backendstep1.herokuapp.com/api/" +
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
    this.setState({ is_loggingin: false });
  };

  //////////////////////////////////////////////Redirect to Login///////////////////////////////////
  // redirectToLogin = () => {
  //   if (this.state.is_loggingin === false) {
  //     setTimeout(function () {
  //       sessionStorage.removeItem("is_loggingin", JSON.stringify(true));
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
        <main id="main_app_page" className="fr">
          <Content
            username={this.state.username}
            first_name={this.state.first_name}
            page="home"
            state={this.state}
            fetchData={this.fetchData}
            loader={this.loader}
          />
          <MenuAside />
          <Route exact path="/">
            <TodoAside fetchData={this.fetchData} />
            <NotesAside fetchData={this.fetchData} />
          </Route>
        </main>
        <Footer
          fetchData={this.fetchData}
          friendsData={this.state.friendsData}
        />
      </div>
    );
  }
}

export default App;
