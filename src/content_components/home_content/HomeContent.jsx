import React, { useEffect } from "react";
import "./HomeContent.css";

const HomeContent = (props) => {
  const searchByDeadlineData = () => {
    const today = new Date();
    let date = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    const used_today = year + "-" + month + "-" + date;

    let ol_table_homecontent = document.getElementById("ol_table_homecontent");
    ol_table_homecontent.innerHTML = "";
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
  useEffect(() => {
    searchByDeadlineData();
  });

  return (
    <div id="content_home_page" className="fc">
      <article id="main_content_home_container" className="fc">
        <section id="greeting_content_home_container">
          <h1 id="h1_greeting_content_home_container">
            Hello {props.username}! Welcome to your profile on <br></br>
            <span style={{ fontFamily: "var(--pacifico)" }}>
              Step1 Study Planner
            </span>
          </h1>
        </section>
        <section>
          <p>
            According to the information you posted in "To do menu", you have
            the following tasks to do for today:{" "}
          </p>
          <ol id="ol_table_homecontent"></ol>
        </section>
      </article>
    </div>
  );
};
export default HomeContent;
