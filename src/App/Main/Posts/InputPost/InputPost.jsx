import React from "react";

const InputForm = (props) => {
  function showInputForm(target, button) {
    let button_task_home = document.getElementById(button);
    let target_section = document.getElementById(target);
    let button_container = document.getElementById("form_home_content_buttons");
    if (button_task_home.value === "unclicked") {
      target_section.style.display = "flex";
      button_task_home.value = "clicked";
      button_container.style.display = "none";
    } else {
      target_section.style.display = "none";
      button_task_home.value = "unclicked";
    }
  }
  ////////////////////////////////AUTO RESIZE TEXTAREA///////////////////////////////////
  function auto_grow(event) {
    let textarea = document.getElementById("textarea_home_content2");
    textarea.style.height = textarea.scrollHeight + "px";

    if (event.which === 8) {
      textarea.style.height = parseInt(textarea.style.height) - 30 + "px";
    }
  }
  return (
    <React.Fragment>
      <section
        id="form_home_content_section"
        className="fc"
        style={{
          width: "100%",
          boxShadow: "0",
          padding: "0",
        }}
      >
        <textarea
          id="textarea_home_content2"
          placeholder="Want to post something?"
          onKeyDown={(event) => auto_grow(event)}
          style={{
            backgroundColor: "var(--black2)",
            color: "white",
            fontSize: "14pt",
            lineHeight: "20pt",
          }}
        ></textarea>
        <section>
          <TodoForm
            fetchData={props.fetchData}
            state={props.state}
            setIsFetching={props.setIsFetching}
          />
        </section>
        <section>
          <NoteForm
            fetchData={props.fetchData}
            state={props.state}
            setIsFetching={props.setIsFetching}
          />
        </section>

        <section
          id="form_home_content_buttons"
          className="fr"
          style={{ backgroundColor: "var(--black3)" }}
        >
          <section
            className="fr"
            style={{
              width: "50%",
              gap: "20px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="fc">
              <button
                onClick={() =>
                  showInputForm("form_todo_home", "button_task_home")
                }
                id="button_task_home"
                value="unclicked"
                style={{
                  backgroundColor: "var(--black2)",
                  boxShadow: "0",
                  border: "solid 2px rgba(0, 0, 0, 0.144)",
                }}
              >
                Task
              </button>
            </div>

            <div className="fr">
              <button
                id="button_note_home"
                value="unclicked"
                onClick={() =>
                  showInputForm("form_notes_home", "button_note_home")
                }
                style={{
                  backgroundColor: "var(--black2)",
                  boxShadow: "0",
                  border: "solid 2px rgba(0, 0, 0, 0.144)",
                }}
              >
                Note
              </button>
            </div>
            <div className="fc">
              <button
                onClick={() =>
                  showInputForm("form_todo_home", "button_task_home")
                }
                id="button_task_home"
                value="unclicked"
                style={{
                  backgroundColor: "var(--black2)",
                  boxShadow: "0",
                  border: "solid 2px rgba(0, 0, 0, 0.144)",
                }}
              >
                Question
              </button>
            </div>
          </section>
        </section>
      </section>
    </React.Fragment>
  );
};
const NoteForm = (props) => {
  return (
    <section id="form_notes_home" className="fr" style={{ display: "none" }}>
      <div className="fr" style={{ flexGrow: "1", gap: "10px" }}>
        <div className="fc input_container">
          <select name="category_notes" id="input_category_notes" title="dsf">
            <option value="" disabled selected hidden>
              Category
            </option>
            <option value="General Principles">General Principles</option>
            <option value="Individual Organ">Individual Organ</option>
          </select>
        </div>

        <div className="fc input_container">
          <select id="input_subject_notes" name="subject">
            <option value="" disabled selected hidden>
              Area
            </option>
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
          <input
            type="text"
            name="textbook"
            id="input_textbook_notes"
            placeholder="Textbook"
          />
        </div>

        <div className="fc input_container">
          <input
            type="text"
            name="page"
            id="input_page_notes"
            placeholder="Page Number"
          />
        </div>
      </div>
      <div>
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
            document.getElementById("button_note_dashboard").value =
              "unclicked";
          }}
        ></i>
      </div>
    </section>
  );
};

const TodoForm = (props) => {
  return (
    <section id="form_todo_home" className="fr" style={{ display: "none" }}>
      <div className="fr input_container" style={{ flexGrow: "1" }}>
        <input
          type="date"
          name="deadline_input"
          id="input_deadline_todoaside"
          placeholder="deadline"
        />
      </div>
      <div className="fr input_container">
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
            document.getElementById("form_todo_dashboard").style.display =
              "none";
            document.getElementById(
              "button_task_dashboard"
            ).style.backgroundColor = "var(--blue)";
            document.getElementById("button_task_dashboard").value =
              "unclicked";
          }}
        ></i>
      </div>
    </section>
  );
};
export default InputForm;
