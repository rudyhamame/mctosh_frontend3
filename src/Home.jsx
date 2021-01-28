import React from "react";
import Footer from "./static_components/Footer";
import Header from "./static_components/Header";
import Main from "./static_components/Main";
import HomeContent from "./content_components/home_content/HomeContent";

//........import CSS...........
import "./css/app.css";
import "./css/header.css";
import "./css/footer.css";
import "./css/aside.css";
import "./css/content.css";
import "./css/main.css";
import "./css/home_content.css";

//........Home Component...........
class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: props.username,
      content_component: null,
      post_state: null,
    };
  }

  //...............Todo REST functions.......................
  buildData = (jsonData, goal) => {
    let df = new DocumentFragment();
    for (var i = 0; i < jsonData.length; i++) {
      //........................................p....................................

      let task_p = document.createElement("p");
      let deadline_p = document.createElement("p");

      task_p.setAttribute("id", "task_column_p" + i);
      deadline_p.setAttribute("id", "deadline_column_p" + i);

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

        deleteIcon.setAttribute("id", "todo_edit" + i);
        editIcon.setAttribute("id", "todo_edit" + i);
        editIcon.setAttribute("class", "fas fa-edit");
        deleteIcon.setAttribute("class", "fas fa-eraser");
        editIcon.addEventListener("click", () =>
          this.fetchData(editIcon.id, "put", "", "")
        );
        deleteIcon.addEventListener("click", () =>
          this.fetchData(deleteIcon.id, "delete", "", "")
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
  };

  //....................PUT and POST......................
  fetchData = (targetID, method_type, goal, search_deadline_value) => {
    //to get date now for search_by_today goal
    let today = new Date();
    let date = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let real_today = year + "-" + month + "-" + date;

    let url;
    let options;
    let task_input_ID = document.getElementById("input_task_todoaside"); //for PUT and POST method
    let deadline_input_ID = document.getElementById("input_deadline_todoaside"); //for PUT and POST method
    let deadline_search = new Date(search_deadline_value); //for search by deadline goal

    //Deciding which route it will take depending on METHOD_TYPE
    switch (method_type) {
      case "put":
      case "post":
        //Preparing fetching request
        let method;
        switch (method_type) {
          case "put":
            url = "https://backendstep1.herokuapp.com/api/Todo/" + targetID;
            method = "PUT";
            break;

          case "post":
            url = "https://backendstep1.herokuapp.com/api/Todo";
            method = "POST";
            break;
        }
        options = {
          method: method,
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task: task_input_ID.value,
            deadline: deadline_input_ID.value,
          }),
        };
        break;

      case "get":
        switch (goal) {
          case "search_by_deadline":
            url =
              "https://backendstep1.herokuapp.com/api/Todo/search?deadline=" +
              deadline_search;
            break;
          case "getAll":
            url = "https://backendstep1.herokuapp.com/api/Todo";
            break;
          case "search_by_today":
            url =
              "https://backendstep1.herokuapp.com/api/Todo/search?deadline=" +
              real_today;
            break;
        }
        options = { method: "GET", mode: "cors" };
        break;
    }

    //After getting all the required information for fetching
    let req = new Request(url, options); //request
    fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("bad Http");
        }
      })
      .then((response) => {
        if (method_type === "get") {
          this.buildData(response, goal);
        } else {
          this.setState({
            post_state: Math.random,
          });
        }
      })
      .catch((err) => {
        console.log("error:", err.message);
      });
    task_input_ID.value = ""; //cleaning inputs
    deadline_input_ID.value = "";
  };

  //.................DELETE......................
  deleteData = (id) => {
    let targetID = document.getElementById(id).parentElement.id;
    const url = "https://backendstep1.herokuapp.com/api/Todo/" + targetID;
    let req = new Request(url, { method: "DELETE", mode: "cors" });
    fetch(req).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("BAD HTTP!");
      }
    });
  };

  //................SEARCH.............................

  //...............REST functions.......................

  componentDidMount() {
    this.setState({
      content_component: <HomeContent username={this.state.username} />,
    });
  }

  content_component_switcher = (props) => {
    this.setState({ content_component: props });
  };

  componentDidUpdate() {
    this.fetchData(null, "get", "getAll", null);
  }

  render() {
    return (
      <div id="app_page" className="fc">
        <Header
          content_component_switcher={this.content_component_switcher}
          username={this.state.username}
        />
        <Main
          content_component_switcher={this.content_component_switcher}
          content_component={this.state.content_component}
          username={this.state.username}
          fetchData={this.fetchData}
        />
        <Footer />
      </div>
    );
  }
}

export default Home;
