import React from "react";
import "./Notes.css";

const Notes = (props) => {
  return (
    <div id="centent_page" className="fc">
      <article id="notes_article" className="fc">
        <section id="notes_section" className="fc">
          <h1 id="h1_notes_text">
            <br /> {props.title}
          </h1>
        </section>
        <section id="content_section_notes">
          <p>{props.info}</p>
          <br />
          <h1
            style={{
              fontFamily: "'Josefin Slab', serif",
              fontSize: "18pt",
              textAlign: "center",
            }}
          >
            Notes
          </h1>
          <ol id="ol_notes_content"></ol>
        </section>
      </article>
    </div>
  );
};

export default Notes;
