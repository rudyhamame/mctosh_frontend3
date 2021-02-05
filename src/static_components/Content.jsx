import Greeting from "../content_components/greeting/Greeting";
import React from "react";
const Content = (props) => {
  const [isFetching, setIsFetching] = React.useState(false);
  function closeGreeting() {
    let greeting_articleGreeting = document.getElementById(
      "greeting_articleGreeting"
    );
    let i_close_control_greetingArticle = document.getElementById(
      "i_close_control_greetingArticle"
    );
    let i_open_control_greetingArticle = document.getElementById(
      "i_open_control_greetingArticle"
    );
    let control_greetingArticle = document.getElementById(
      "control_greetingArticle"
    );
    greeting_articleGreeting.style.height = "0";
    control_greetingArticle.style.backgroundColor = "var(--blue)";
    i_close_control_greetingArticle.style.display = "none";
    i_open_control_greetingArticle.style.display = "inline";
    i_open_control_greetingArticle.style.color = "var(--white)";
  }
  function openGreeting() {
    let greeting_articleGreeting = document.getElementById(
      "greeting_articleGreeting"
    );
    let i_close_control_greetingArticle = document.getElementById(
      "i_close_control_greetingArticle"
    );
    let i_open_control_greetingArticle = document.getElementById(
      "i_open_control_greetingArticle"
    );
    let control_greetingArticle = document.getElementById(
      "control_greetingArticle"
    );
    control_greetingArticle.style.backgroundColor = "var(--blue)";
    greeting_articleGreeting.style.height = "200px";
    control_greetingArticle.style.backgroundColor = "var(--white)";
    i_close_control_greetingArticle.style.display = "inline";
    i_open_control_greetingArticle.style.display = "none";
  }

  switch (props.page) {
    case "home":
      return (
        <div id="content_main_page" className="fc">
          {isFetching && props.loader()}
          <div id="centent_page" className="fc">
            <article id="greeting_articleGreeting" className="fc">
              <section id="content_articleGreeting" className="fr">
                <Greeting state={props.state} />
                <InputForm
                  fetchData={props.fetchData}
                  state={props.state}
                  setIsFetching={setIsFetching}
                />
              </section>
            </article>
            <section id="control_greetingArticle">
              <i
                class="fas fa-arrow-up"
                id="i_close_control_greetingArticle"
                onClick={closeGreeting}
              ></i>
              <i
                class="fas fa-arrow-down"
                id="i_open_control_greetingArticle"
                onClick={openGreeting}
                style={{ display: "none" }}
              ></i>
            </section>
            <article id="fetching_out_page" className="fc">
              sfsfsdf
            </article>
          </div>
        </div>
      );

    case "profile":
      <div id="content_main_page" className="fc">
        <div id="centent_page" className="fc">
          <Greeting />;
        </div>
      </div>;
      break;
  }
};

export default Content;

const InputForm = (props) => {
  function showInputForm(target, button) {
    let button_task_dashboard = document.getElementById(button);
    let target_section = document.getElementById(target);
    if (button_task_dashboard.value === "unclicked") {
      target_section.style.display = "flex";
      button_task_dashboard.value = "clicked";
      button_task_dashboard.style.backgroundColor = "var(--green)";
    } else {
      target_section.style.display = "none";
      button_task_dashboard.value = "unclicked";
      button_task_dashboard.style.backgroundColor = "var(--blue)";
    }
  }
  return (
    <React.Fragment>
      <section id="form_home_content_section">
        <textarea
          id="textarea_home_content"
          placeholder="Want to post something?"
        ></textarea>

        <section id="form_home_content_buttons" className="fr">
          <section className="fr" style={{ width: "50%", gap: "20px" }}>
            <div className="fc">
              <button
                onClick={() =>
                  showInputForm("form_todo_dashboard", "button_task_dashboard")
                }
                id="button_task_dashboard"
                value="unclicked"
              >
                Task
              </button>
              <div>
                <TodoForm
                  fetchData={props.fetchData}
                  state={props.state}
                  setIsFetching={props.setIsFetching}
                />
              </div>
            </div>
            <div className="fc">
              <button
                id="button_note_dashboard"
                value="unclicked"
                onClick={() =>
                  showInputForm("form_notes_dashboard", "button_note_dashboard")
                }
              >
                Note
              </button>
              <div>
                <NoteForm
                  fetchData={props.fetchData}
                  state={props.state}
                  setIsFetching={props.setIsFetching}
                />
              </div>
            </div>
            <div className="fc">
              <button
                onClick={() =>
                  showInputForm("form_todo_dashboard", "button_task_dashboard")
                }
                id="button_task_dashboard"
                value="unclicked"
              >
                Question
              </button>
              <div>
                <TodoForm
                  fetchData={props.fetchData}
                  state={props.state}
                  setIsFetching={props.setIsFetching}
                />
              </div>
            </div>
          </section>
        </section>
      </section>
    </React.Fragment>
  );
};

const NoteForm = (props) => {
  return (
    <section id="form_notes_dashboard" className="fc">
      <div className="fc input_container">
        <label>Category</label>
        <select name="category_notes" id="input_category_notes">
          <option value="General Principles">General Principles</option>
          <option value="Individual Organ">Individual Organ</option>
        </select>
      </div>

      <div className="fc input_container">
        <label>Subject</label>
        <select id="input_subject_notes" name="subject">
          <option value="Pathology">Pathology</option>
          <option value="Physiology">Physiology</option>
          <option value="Pharmacology">Pharmacology</option>
          <option value="Biochemistry">Biochemistry</option>
          <option value="Nutrition">Nutrition</option>
          <option value="Microbiology">Microbiology</option>
          <option value="Immunology">Immunology</option>
          <option value="Gross Anatomy">Gross Anatomy</option>
          <option value="Embryology">Embryology</option>
          <option value="Histology">Histology</option>
          <option value="Cell Biology">Cell Biology</option>
          <option value="Behavioral Sciences">Behavioral Sciences</option>
          <option value="Genetics">Genetics</option>
        </select>
      </div>

      <div className="fc input_container">
        <label>Textbook</label>
        <input
          type="text"
          name="textbook"
          id="input_textbook_notes"
          placeholder="Textbook"
        />
      </div>

      <div className="fc input_container">
        <label>Page Number</label>
        <input
          type="text"
          name="page"
          id="input_page_notes"
          placeholder="Page Number"
        />
      </div>

      <i
        id="i_submit_NotesAside"
        class="fas fa-paper-plane"
        onClick={() => {
          props.fetchData({
            url: "http://localhost:4000/api/user/notes/",
            method: "POST",
            body: {
              text: document.getElementById("textarea_home_content").value,
              category: document.getElementById("input_category_notes").value,
              subject: document.getElementById("input_subject_notes").value,
              textbook: document.getElementById("input_textbook_notes").value,
              page: document.getElementById("input_page_notes").value,
              state: "created",
            },
            isFetching: props.setIsFetching,
          });
          document.getElementById("form_notes_dashboard").style.display =
            "none";
          document.getElementById(
            "button_note_dashboard"
          ).style.backgroundColor = "var(--blue)";
          document.getElementById("button_note_dashboard").value = "unclicked";
        }}
      ></i>
    </section>
  );
};

const TodoForm = (props) => {
  return (
    <section id="form_todo_dashboard" className="fc">
      <div className="fc input_container">
        <label>Deadline</label>
        <input
          type="date"
          name="deadline_input"
          id="input_deadline_todoaside"
          placeholder="deadline"
        />
      </div>
      <i
        id="i_submit_todoAside"
        class="fas fa-paper-plane"
        onClick={() => {
          props.fetchData({
            url: "http://localhost:4000/api/user/todolist/",
            method: "POST",
            body: {
              task: document.getElementById("textarea_home_content").value,
              deadline: document.getElementById("input_deadline_todoaside")
                .value,
            },
            isFetching: props.setIsFetching,
          });
          document.getElementById("form_todo_dashboard").style.display = "none";
          document.getElementById(
            "button_task_dashboard"
          ).style.backgroundColor = "var(--blue)";
          document.getElementById("button_task_dashboard").value = "unclicked";
        }}
      ></i>
    </section>
  );
};
