import React from "react";

const InputForm = (props) => {
  ////////////////////////////////AUTO RESIZE TEXTAREA///////////////////////////////////
  function auto_grow(event) {
    let textarea = document.getElementById("InputPost_textarea");
    textarea.style.height = textarea.scrollHeight + "px";

    if (event.which === 8) {
      textarea.style.height = textarea.scrollHeight - 20 + "px";
    }
  }
  function minimizeHeight() {
    let textarea = document.getElementById("InputPost_textarea");

    if (textarea.value === "") {
      textarea.style.height = 0 + "px";
    }
  }
  return (
    <article id="InputPost_article" className="fc">
      <section className="fr" id="InputPost_textarea_container">
        <textarea
          id="InputPost_textarea"
          placeholder="Wants to post something?"
          onKeyDown={(event) => auto_grow(event)}
          onChange={(event) => minimizeHeight(event)}
        ></textarea>
      </section>
      <section className="InputPost_inputs_container" className="fr">
        <select id="InputPost_category" title="dsf">
          <option value="" disabled selected hidden>
            Category
          </option>
          <option value="General Principles">General Principles</option>
          <option value="Individual Organ">Individual Organ</option>
        </select>

        <select id="InputPost_subject" name="subject">
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

        <input
          type="text"
          name="textbook"
          id="InputPost_resourse"
          placeholder="Resourse"
        />

        <input
          type="text"
          name="page"
          id="InputPost_page"
          placeholder="Page Number"
        />
        <button
          id="InputPost_post_button"
          value="unclicked"
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
        >
          post
        </button>
      </section>
    </article>
  );
};

export default InputForm;
