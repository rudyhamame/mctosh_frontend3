import React from "react";

const Tasks = (props) => {
  let noteID = "6019fec6ff5c301e141c0b86";
  let userID = "6019efc3431a04000469788e";
  let params = "notes/" + userID;

  const opentodoAside = () => {
    let todouaside_main_container = document.getElementById(
      "todouaside_main_container"
    );
    let control_todoAside = document.getElementById("control_todoAside");
    let open_icon = document.getElementById("i_open_todoAside");
    if (control_todoAside.title === "unclicked") {
      todouaside_main_container.style.width = "300px";
      control_todoAside.title = "clicked";
      open_icon.className = "fas fa-arrow-left";
    } else {
      todouaside_main_container.style.width = "0";
      control_todoAside.title = "unclicked";
      open_icon.className = "fas fa-arrow-right";
    }
  };

  // function postData() {
  //   props.fetchData(POSTmessenger);
  // }

  function search_by_deadline_Data(search_deadline_value) {
    props.fetchData(
      null,
      "get",
      "search_by_deadline",
      search_deadline_value,
      "Todo"
    );
  }

  React.useEffect(() => {});

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
              search_by_deadline_Data(
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

        <section id="form_post_todoaside" className="fc">
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
          <i id="i_submit_todoAside" class="fas fa-paper-plane"></i>
        </section>
      </section>
      <section
        onClick={opentodoAside}
        className="fr"
        id="control_todoAside"
        title="unclicked"
      >
        <i id="i_open_todoAside" class="fas fa-arrow-right"></i>
      </section>
    </aside>
  );
};

export default Tasks;
