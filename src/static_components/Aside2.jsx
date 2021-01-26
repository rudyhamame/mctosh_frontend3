import React, { useState, useEffect } from "react";

const Aside2 = () => {
  const getData = () => {
    let todo_ul = document.getElementById("todo_table");
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
          let status_p = document.createElement("p");

          task_p.setAttribute("id", "task_column_p" + i);
          deadline_p.setAttribute("id", "deadline_column_p" + i);
          status_p.setAttribute("id", "status_column_p" + i);

          task_p.textContent = "Task: " + jsonData[i].task;
          status_p.textContent = "Status: " + jsonData[i].status;

          let date = new Date();
          deadline_p.textContent =
            "Deadline: " +
            date.getDate(jsonData[i].deadline) +
            "/" +
            date.getMonth(jsonData[i].deadline) +
            "/" +
            date.getFullYear(jsonData[i].deadline);

          //........................................li....................................
          let todo_li = document.createElement("li");
          todo_li.appendChild(task_p);
          todo_li.appendChild(deadline_p);
          todo_li.appendChild(status_p);
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
    let task_input = document.getElementById("task_input");
    let deadline_input = document.getElementById("deadline_input");
    let status_input = document.getElementById("status_input");

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
        status: status_input.value,
      }), // body data type must match "Content-Type" header
    };
    task_input.value = "";
    deadline_input.value = "";
    status_input.value = "";

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
    let task_input = document.getElementById("task_input");
    let deadline_input = document.getElementById("deadline_input");
    let status_input = document.getElementById("status_input");

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
        status: status_input.value,
      }), // body data type must match "Content-Type" header
    };
    task_input.value = "";
    deadline_input.value = "";
    status_input.value = "";

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
  const closeAside2 = () => {
    let home_content_div = document.getElementById("home_content_div");
    let close_aside2 = document.getElementById("close_aside2");
    let open_aside2 = document.getElementById("open_aside2");

    home_content_div.style.display = "none";
    close_aside2.style.display = "none";
    open_aside2.style.display = "inline";
  };
  const openAside2 = () => {
    let home_content_div = document.getElementById("home_content_div");
    let close_aside2 = document.getElementById("close_aside2");
    let open_aside2 = document.getElementById("open_aside2");

    home_content_div.style.display = "inline";
    close_aside2.style.display = "inline";
    open_aside2.style.display = "none";
  };
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    getData();
  }, [counter]);

  return (
    <div className="fr">
      <div
        id="home_content_div"
        className="fc"
        style={{ display: "none", backgroundColor: "var(--gray_for_read)" }}
      >
        <h3
          style={{
            fontFamily: "'Pacifico',cursive",
            fontWeight: "300",
            padding: "10px",
            backgroundColor: "var(--gray_for_read)",
            textAlign: "center",
            boxShadow: "0 0 3px black",
            color: "var(--white)",
            fontSize: "14pt",
          }}
        >
          Todo list
        </h3>
        <ul
          id="todo_table"
          style={{
            flexGrow: "1",
            fontSize: "16pt",
            fontFamily: "'Roboto', sans-serif",
            backgroundColor: "black",
            fontSize: "12pt",
            overflow: "auto",
            overflowWrap: "break-word",
          }}
        ></ul>
        <form id="input_form_todo" action="">
          <input
            type="text"
            name="task_input"
            id="task_input"
            placeholder="task"
          />
          <input
            type="text"
            name="status_input"
            id="status_input"
            placeholder="status"
          />
          <input
            type="date"
            name="deadline_input"
            id="deadline_input"
            placeholder="deadline"
          />
          <i id="submit_icon" onClick={postData} class="fas fa-paper-plane"></i>
        </form>
      </div>
      <div
        style={{
          backgroundColor: "var(--gray_for_read)",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="fr"
      >
        <i
          id="open_aside2"
          class="fas fa-arrow-right"
          style={{ color: "var(--white)", fontSize: "16pt", padding: "10px" }}
          onClick={openAside2}
        ></i>
        <i
          id="close_aside2"
          class="fas fa-arrow-left"
          style={{
            color: "var(--white)",
            fontSize: "16pt",
            padding: "10px",
            display: "none",
          }}
          onClick={closeAside2}
        ></i>
      </div>
    </div>
  );
};

export default Aside2;
