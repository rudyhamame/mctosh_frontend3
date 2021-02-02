import React from "react";
import "./NotesAside.css";

const NotesAside = (props) => {
  const openNotesAside = () => {
    let NotesAside_main_container = document.getElementById(
      "NotesAside_main_container"
    );
    let control_NotesAside = document.getElementById("control_NotesAside");
    let open_icon = document.getElementById("i_open_NotesAside");
    if (control_NotesAside.title === "unclicked") {
      NotesAside_main_container.style.width = "300px";
      control_NotesAside.title = "clicked";
      open_icon.className = "fas fa-arrow-right";
    } else {
      NotesAside_main_container.style.width = "0";
      control_NotesAside.title = "unclicked";
      open_icon.className = "fas fa-arrow-left";
    }
  };

  function postData() {
    props.fetchData(null, "post", "", null, "BiochemMolbio");
  }

  //   function search_by_deadline_Data(search_deadline_value) {
  //     props.fetchData(
  //       null,
  //       "get",
  //       "search_by_deadline",
  //       search_deadline_value,
  //       "Todo"
  //     );
  //   }

  return (
    <aside id="NotesAside_main_page" className="fr">
      <section id="NotesAside_main_container" className="fc">
        <h3 id="h3_title_NotesAside">
          Biochemistry and Molecular Biology Notes
        </h3>
        <section id="keyword_search_NotesAside" className="fr">
          <label id="label_search_NotesAside">Search</label>
          <input
            id="input_keyword_search"
            type="text"
            // onChange={() =>
            //   search_by_deadline_Data(
            //     document.getElementById("input_deadline_search").value
            //   )
            // }
            placeholder="Enter a keyword"
          />
        </section>
        <iframe
          id="piano_for_study"
          src="https://www.youtube.com/embed/XULUBg_ZcAU"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <form id="gpForm_post_NotesAside" className="fc">
          <h2>Add new note</h2>
          <label>Category</label>
          <select name="category_notes" id="input_category_notes">
            <option value="General Principles">General Principles</option>
            <option value="Individual Organ">Individual Organ</option>
          </select>
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
          <label>Textbook</label>
          <input
            type="text"
            name="textbook"
            id="input_textbook_notes"
            placeholder="Textbook"
          />
          <label>Page Number</label>

          <input
            type="text"
            name="textbook"
            id="input_page_notes"
            placeholder="Page Number"
          />
          <label>Note</label>
          <textarea id="input_note_notes" placeholder="Page Number"></textarea>
          <i
            id="i_submit_NotesAside"
            onClick={postData}
            class="fas fa-paper-plane"
          ></i>
        </form>
      </section>
      <section
        onClick={openNotesAside}
        className="fr"
        id="control_NotesAside"
        title="unclicked"
      >
        <i id="i_open_NotesAside" class="fas fa-arrow-left"></i>
      </section>
    </aside>
  );
};

export default NotesAside;
