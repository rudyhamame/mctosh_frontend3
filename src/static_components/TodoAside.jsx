import React, { useState, useEffect } from "react";

const TodoAside = (props) => {
  // function onChangeSearching(query) {
  //   // searchByDeadlineData(query);
  //   if (query === "") {
  //     // getData();
  //   }
  // }

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

  function postData() {
    props.fetchData(null, "post", "", null);
    setCounter(counter + 1);
  }

  useEffect(() => {
    props.fetchData(null, "get", "getAll", null);
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
            // onChange={() =>
            //   onChangeSearching(
            //     document.getElementById("input_deadline_search").value
            //   )
            // }
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
