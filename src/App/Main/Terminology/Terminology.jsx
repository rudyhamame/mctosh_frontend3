import React from "react";

const Terminology = (props) => {
  const openInputForm = () => {
    document.getElementById("Terminology_inputs_container").style.display =
      "flex";
    document.getElementById("Terminology_control_icon_close").style.display =
      "inline";
    document.getElementById("Terminology_control_icon_open").style.display =
      "none";
  };
  const closeInputForm = () => {
    document.getElementById("Terminology_inputs_container").style.display =
      "none";
    document.getElementById("Terminology_control_icon_close").style.display =
      "none";
    document.getElementById("Terminology_control_icon_open").style.display =
      "inline";
  };
  const openNotesAside = () => {
    let Terminology_container = document.getElementById(
      "Terminology_container"
    );
    let Terminology_article = document.getElementById("Terminology_article");
    let Terminology_control_door = document.getElementById(
      "Terminology_control_door"
    );
    let app_page = document.querySelector("#app_page");
    let app_page_css = window.getComputedStyle(app_page);
    if (Terminology_control_door.title === "unclicked") {
      if (parseInt(app_page_css.width) >= 1500) {
        Terminology_container.style.width = "400px";
      }
      if (parseInt(app_page_css.width) < 1600) {
        Terminology_container.style.width = "500px";
      }
      if (parseInt(app_page_css.width) < 1200) {
        Terminology_article.style.height = "80vh";
        Terminology_container.style.height = "100%";
      }

      Terminology_control_door.title = "clicked";
    } else {
      if (parseInt(app_page_css.width) < 1200) {
        Terminology_container.style.height = "0";
        Terminology_container.style.height = "initial";
      } else {
        Terminology_container.style.width = "0";
      }
      Terminology_control_door.title = "unclicked";
    }
  };
  return (
    <article id="Terminology_article" className="fr">
      <section id="Terminology_container" className="fc">
        <h1 id="Terminology_title">Terminology</h1>
        <ul id="Terminology_content_container" className="fc"></ul>
        <i
          class="fas fa-plus"
          id="Terminology_control_icon_open"
          onClick={openInputForm}
        ></i>
        <i
          class="fas fa-minus"
          id="Terminology_control_icon_close"
          onClick={closeInputForm}
        ></i>
        <section id="Terminology_inputs_container" className="fc">
          <input
            type="text"
            name="term"
            id="Terminology_term"
            placeholder="Enter a medical term"
          />
          <textarea
            type="text"
            name="term"
            id="Terminology_meaning"
            placeholder="What does it mean .."
          />
          <select id="Terminology_category" title="dsf">
            <option value="" disabled selected hidden>
              Under which category ..
            </option>
            <option value="General Principles">General Principles</option>
            <option value="Individual Organ">Individual Organ</option>
          </select>

          <select id="Terminology_subject" name="subject">
            <option value="" disabled selected hidden>
              Under which subject ..
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
          <button
            id="Terminology_post_button"
            value="unclicked"
            onClick={() => {
              props.postingTerminology(
                document.getElementById("Terminology_term").value,
                document.getElementById("Terminology_meaning").value,
                document.getElementById("Terminology_category").value,
                document.getElementById("Terminology_subject").value
              );
            }}
          >
            post
          </button>
        </section>
      </section>
      <section
        onClick={openNotesAside}
        className="fr"
        id="Terminology_control_door"
        title="unclicked"
      >
        <i class="fas fa-sticky-note"></i>
      </section>
    </article>
  );
};

export default Terminology;
