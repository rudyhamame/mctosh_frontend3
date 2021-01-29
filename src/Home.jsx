import React from "react";
import Footer from "./static_components/Footer";
import Header from "./static_components/Header";
import Main from "./static_components/Main";
import Greeting from "./content_components/greeting/Greeting";

//........import CSS...........
import "./css/app.css";
import "./css/header.css";
import "./css/footer.css";
import "./css/aside.css";
import "./css/content.css";
import "./css/main.css";

//........Home Component...........
class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: props.username,
      rendered_page: <Greeting username={props.username} />,
      afterFetch_refresher: null,
    };
  }

  //...............Todo REST functions.......................
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
          let category_p = document.createElement("p");
          let subject_p = document.createElement("p");
          let textbook_p = document.createElement("p");
          let page_p = document.createElement("p");
          let date_p = document.createElement("p");

          category_p.setAttribute("id", "category_p" + i);
          subject_p.setAttribute("id", "subject_p" + i);
          textbook_p.setAttribute("id", "textbook_p" + i);
          page_p.setAttribute("id", "page_p" + i);
          date_p.setAttribute("id", "date_p" + i);

          category_p.textContent = "Category: " + jsonData[i].category;
          subject_p.textContent = "Subject: " + jsonData[i].subject;
          textbook_p.textContent =
            "Textbook: " + jsonData[i].textbook + ", Page. " + jsonData[i].page;

          let dbDate = String(jsonData[i].date);
          let frontDate = dbDate.split("T");
          date_p.textContent = "Date added: " + frontDate[0];

          //........................................li....................................

          let note_li = document.createElement("li");
          note_li.appendChild(category_p);
          note_li.appendChild(subject_p);
          note_li.appendChild(textbook_p);
          note_li.appendChild(date_p);
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
        }
        //........................................ul appending....................................
        let note_ul = document.getElementById("ol_notes_content");
        note_ul.innerHTML = "";
        note_ul.appendChild(df);
        break;
    }
  };

  //....................Fetch DATA......................
  fetchData = (targetID, method_type, goal, search_deadline_value, page) => {
    //to get date now for search_by_today goal
    let today = new Date();
    let date = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let real_today = year + "-" + month + "-" + date;

    let url;
    let options;
    let used_targetID; //for id that is needed for DELETE&PUT

    //.....................for Todo..............
    let task_input_ID = document.getElementById("input_task_todoaside"); //for PUT and POST method
    let deadline_input_ID = document.getElementById("input_deadline_todoaside"); //for PUT and POST method
    let deadline_search = new Date(search_deadline_value); //for search by deadline goal
    //.....................for Todo..............
    let category_input_ID = document.getElementById("input_category_notes"); //for PUT and POST method
    let subject_input_ID = document.getElementById("input_subject_notes"); //for PUT and POST method
    let textbook_input_ID = document.getElementById("input_textbook_notes"); //for PUT and POST method
    let page_input_ID = document.getElementById("input_page_notes"); //for PUT and POST method

    //.....................for BiochemMolbio............

    //Deciding which route it will take depending on METHOD_TYPE
    switch (method_type) {
      case "put":
      case "post":
      case "delete":
        //Preparing fetching request
        let method;
        let body;
        switch (method_type) {
          case "put":
            used_targetID = document.getElementById(targetID).parentElement.id; //for id that is needed for DELETE&PUT

            url =
              "https://backendstep1.herokuapp.com/api/" +
              page +
              "/" +
              used_targetID;
            method = "PUT";
            break;
          case "post":
            url = "https://backendstep1.herokuapp.com/api/" + page;
            method = "POST";
            switch (page) {
              case "Todo":
                body = JSON.stringify({
                  task: task_input_ID.value,
                  deadline: deadline_input_ID.value,
                });
                break;

              case "BiochemMolbio":
                body = JSON.stringify({
                  subject: subject_input_ID.value,
                  category: category_input_ID.value,
                  textbook: textbook_input_ID.value,
                  page: page_input_ID.value,
                });
                break;
            }
            break;
          case "delete":
            used_targetID = document.getElementById(targetID).parentElement.id; //for id that is needed for DELETE&PUT

            url =
              "https://backendstep1.herokuapp.com/api/" +
              page +
              "/" +
              used_targetID;
            method = "DELETE";
            break;
        }
        options = {
          method: method,
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        };
        break;

      case "get":
        switch (goal) {
          case "search_by_deadline":
            url =
              "https://backendstep1.herokuapp.com/api/" +
              page +
              "/search?deadline=" +
              deadline_search;
            break;
          case "getAll":
            url = "https://backendstep1.herokuapp.com/api/" + page;
            break;
          case "search_by_today":
            url =
              "https://backendstep1.herokuapp.com/api/" +
              page +
              "/search?deadline=" +
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
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("bad Http");
        }
      })
      .then((response) => {
        if (method_type === "get") {
          this.buildData(response, goal, page);
        } else {
          this.setState({
            afterFetch_refresher: Math.random,
          });
        }
      })
      .catch((err) => {
        console.log("error:", err.message);
      });
    task_input_ID.value = ""; //cleaning inputs
    deadline_input_ID.value = "";
  };

  //...............REST functions.......................

  componentDidMount() {
    this.fetchData(null, "get", "getAll", null, "Todo");
    this.fetchData(null, "get", "search_by_today", null, "Todo");
    this.fetchData(null, "get", "getAll", null, "BiochemMolbio");
  }

  rendered_page_switcher = (props) => {
    this.setState({ rendered_page: props });
  };

  componentDidUpdate() {
    this.fetchData(null, "get", "getAll", null, "Todo");
    this.fetchData(null, "get", "search_by_today", null, "Todo");
    this.fetchData(null, "get", "getAll", null, "BiochemMolbio");
  }

  render() {
    return (
      <div id="app_page" className="fc">
        <Header
          rendered_page_switcher={this.rendered_page_switcher}
          username={this.state.username}
        />
        <Main
          rendered_page_switcher={this.rendered_page_switcher}
          rendered_page={this.state.rendered_page}
          username={this.state.username}
          fetchData={this.fetchData}
          // NotesAndTerms_switcher={this.NotesAndTerms_switcher()}
        />
        <Footer />
      </div>
    );
  }
}

export default Home;
