import React, { useState, useEffect } from "react";

const TodoAside = () => {
  const getData = () => {
    let todo_ul = document.getElementById("ul_table_todoaside");
    todo_ul.innerHTML = "";
    const url = "https://backendstep1.herokuapp.com/api/Todo";
    let req = new Request(url, { method: "GET", mode: "cors" });
    fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("BAD HTTP!");
        }
      })

      .then((jsonData) => {
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
          todo_li.appendChild(deadline_p);
          todo_li.setAttribute("id", "todo_li" + i);

          //........................................delete/edit icons....................................

          let divIcons = document.createElement("div");
          let deleteIcon = document.createElement("i");
          let editIcon = document.createElement("i");

          divIcons.setAttribute("id", String(jsonData[i]._id));
          divIcons.setAttribute("class", "div_icons");

          deleteIcon.setAttribute("id", "todo_edit" + i);
          editIcon.setAttribute("id", "todo_edit" + i);
          editIcon.setAttribute("class", "fas fa-edit");
          deleteIcon.setAttribute("class", "fas fa-eraser");
          editIcon.addEventListener("click", () => putData(editIcon.id));
          deleteIcon.addEventListener("click", () => deleteData(deleteIcon.id));

          divIcons.appendChild(deleteIcon);
          divIcons.appendChild(editIcon);
          todo_li.appendChild(divIcons);
          df.appendChild(todo_li);
        }
        todo_ul.appendChild(df);
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };
  function postData(event) {
    event.preventDefault();
    let task_input = document.getElementById("input_task_todoaside");
    let deadline_input = document.getElementById("input_deadline_todoaside");

    let url = "https://backendstep1.herokuapp.com/api/Todo";
    let options = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        task: task_input.value,
        deadline: deadline_input.value,
      }), // body data type must match "Content-Type" header
    };
    task_input.value = "";
    deadline_input.value = "";

    let req = new Request(url, options);

    fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("bad Http");
        }
      })
      .then(() => {
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.log("error:", err.message);
      });
  }
  function putData(id) {
    let targetID = document.getElementById(id).parentElement.id;
    let task_input = document.getElementById("input_task_todoaside");
    let deadline_input = document.getElementById("input_deadline_todoaside");

    let url = "https://backendstep1.herokuapp.com/api/Todo/" + targetID;
    let options = {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        task: task_input.value,
        deadline: deadline_input.value,
      }), // body data type must match "Content-Type" header
    };
    task_input.value = "";
    deadline_input.value = "";

    let req = new Request(url, options);

    fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("bad Http");
        }
      })
      .then(() => {
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.log("error:", err.message);
      });
  }

  function deleteData(id) {
    let targetID = document.getElementById(id).parentElement.id;
    const url = "https://backendstep1.herokuapp.com/api/Todo/" + targetID;
    let req = new Request(url, { method: "DELETE", mode: "cors" });
    fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("BAD HTTP!");
        }
      })
      .then(() => {
        setCounter(counter + 1);
      });
  }

  const searchByDeadlineData = (query) => {
    const deadline_valid = new Date(query);
    let todo_ul = document.getElementById("ul_table_todoaside");
    todo_ul.innerHTML = "";
    const url =
      "https://backendstep1.herokuapp.com/api/Todo/search?deadline=" +
      deadline_valid;
    let req = new Request(url, { method: "GET", mode: "cors" });
    fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("BAD HTTP!");
        }
      })

      .then((jsonData) => {
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
          todo_li.appendChild(deadline_p);
          todo_li.setAttribute("id", "todo_li" + i);

          //........................................delete/edit icons....................................

          let divIcons = document.createElement("div");
          let deleteIcon = document.createElement("i");
          let editIcon = document.createElement("i");

          divIcons.setAttribute("id", String(jsonData[i]._id));
          divIcons.setAttribute("class", "div_icons");

          deleteIcon.setAttribute("id", "todo_edit" + i);
          editIcon.setAttribute("id", "todo_edit" + i);
          editIcon.setAttribute("class", "fas fa-edit");
          deleteIcon.setAttribute("class", "fas fa-eraser");
          editIcon.addEventListener("click", () => putData(editIcon.id));
          deleteIcon.addEventListener("click", () => deleteData(deleteIcon.id));

          divIcons.appendChild(deleteIcon);
          divIcons.appendChild(editIcon);
          todo_li.appendChild(divIcons);
          df.appendChild(todo_li);
        }
        todo_ul.appendChild(df);
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  const searchByTodayData = () => {
    const today = new Date();
    let date = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    const used_today = year + "-" + month + "-" + date;

    let ol_table_homecontent = document.getElementById("ol_table_homecontent");
    const url =
      "https://backendstep1.herokuapp.com/api/Todo/search?deadline=" +
      used_today;
    let req = new Request(url, { method: "GET", mode: "cors" });
    fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("BAD HTTP!");
        }
      })

      .then((jsonData) => {
        let df = new DocumentFragment();
        ol_table_homecontent.innerHTML = "";

        for (var i = 0; i < jsonData.length; i++) {
          //........................................p....................................

          let task_p = document.createElement("p");

          task_p.setAttribute("id", "task_column_p" + i);

          task_p.textContent = jsonData[i].task;

          //........................................li....................................
          let todo_li = document.createElement("li");
          todo_li.appendChild(task_p);
          todo_li.setAttribute("id", "todo_li" + i);

          //........................................delete/edit icons....................................

          df.appendChild(todo_li);
        }
        ol_table_homecontent.appendChild(df);
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  function onChangeSearching(query) {
    searchByDeadlineData(query);
    if (query === "") {
      getData();
    }
  }

  const closetodoAside = () => {
    let todouaside_main_container = document.getElementById(
      "todouaside_main_container"
    );
    let i_close_todoAside = document.getElementById("i_close_todoAside");
    let i_open_todoAside = document.getElementById("i_open_todoAside");

    todouaside_main_container.style.width = "0";
    i_close_todoAside.style.display = "none";
    i_open_todoAside.style.display = "inline";
  };
  const opentodoAside = () => {
    let todouaside_main_container = document.getElementById(
      "todouaside_main_container"
    );
    let i_close_todoAside = document.getElementById("i_close_todoAside");
    let i_open_todoAside = document.getElementById("i_open_todoAside");

    todouaside_main_container.style.width = "300px";
    i_close_todoAside.style.display = "inline";
    i_open_todoAside.style.display = "none";
  };
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    getData();
    searchByTodayData();
  }, [counter]);

  return (
    <aside id="todoaside_main_page" className="fr">
      <section id="todouaside_main_container" className="fc">
        <h3 id="h3_title_todoaside">Todo list</h3>
        <section id="title_search_todoaside" className="fr">
          <label id="label_search_todoaside">Search </label>
          <input
            id="input_deadline_search"
            type="date"
            onChange={() =>
              onChangeSearching(
                document.getElementById("input_deadline_search").value
              )
            }
          />
        </section>
        <ul
          id="ul_table_todoaside"
          style={{
            backgroundOrigin: "border-box",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></ul>
        <form id="form_post_todoaside" className="fc">
          <input
            type="text"
            name="task_input"
            id="input_task_todoaside"
            placeholder="task"
          />
          <input
            type="date"
            name="deadline_input"
            id="input_deadline_todoaside"
            placeholder="deadline"
          />
          <i
            id="i_submit_todoAside"
            onClick={postData}
            class="fas fa-paper-plane"
          ></i>
        </form>
      </section>
      <section className="fr" id="control_todoAside">
        <i
          id="i_open_todoAside"
          class="fas fa-arrow-right"
          onClick={opentodoAside}
        ></i>
        <i
          id="i_close_todoAside"
          class="fas fa-arrow-left"
          style={{
            display: "none",
          }}
          onClick={closetodoAside}
        ></i>
      </section>
    </aside>
  );
};

export default TodoAside;
