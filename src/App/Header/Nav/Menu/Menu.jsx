import React from "react";
import Notes from "../content_components/notes/Notes";

const MenuAside = (props) => {
  function close_menu() {
    let i_nav_menu = document.getElementById("i_nav_menu");
    document.getElementById("menuaside_main_page").style.display = "none";
    i_nav_menu.title = "unclicked";
  }

  return (
    <aside id="menuaside_main_page">
      <div id="menuaside_main_container" onClick={close_menu}>
        <h3 id="h3_first_title_menuaside">
          General Principles of Foundational Science
        </h3>
        <ul id="ul_first_submenu_menuaside" className="fc">
          <li
            onClick={() =>
              props.rendered_page_switcher(
                <Notes
                  username={props.username}
                  title="General Principles of Foundational Science"
                  info="The General Principles category for the Step 1 examination includes test items concerning those normal and abnormal processes that are not limited to specific organ systems."
                />
              )
            }
          >
            General Information
          </li>
          <li
            onClick={() =>
              props.rendered_page_switcher(
                <Notes
                  username={props.username}
                  title="Biochemistry and Molecular Biology Notes"
                  info="Here you find all the notes that are related to Biochemistry and
            Molecular biology. You'll also find all the outline centents that
            are also related to them, according to the USMLE STEP1 official
            website."
                />
              )
            }
          >
            Biochemistry and molecular biology
          </li>

          <li>Biology of cells</li>
          <li>Human development and genetics</li>

          <li>Biology of tissue response to disease</li>

          <li>Pharmacodynamic and pharmacokinetic processes</li>

          <li>Microbial biology</li>

          <li>Normal age-related findings and care of the well patient</li>
        </ul>
        <h3 id="h3_second_title_menuaside">Organ System</h3>
        <ul id="ul_second_submenu_menuaside" className="fc">
          <li>Immune System</li>
          <li>Blood & Lymphoreticular System</li>
          <li>Behavioral Health</li>
          <li>Nervous System & Special Senses</li>
          <li>Skin & Subcutaneous Tissue</li>
          <li>Musculoskeletal System</li>
          <li>Cardiovascular System</li>
          <li>Respiratory System</li>
          <li>Gastrointestinal System</li>
          <li>Renal & Urinary System</li>
          <li>Pregnancy, Childbirth, & the Puerperium</li>
          <li>Female Reproductive System & Breast</li>
          <li>Male Reproductive System</li>
          <li>Endocrine System</li>
          <li>Multisystem Processes & Disorders</li>
        </ul>
        <h3 id="h3_third_title_menuaside"> Medical Literature</h3>
        <ul id="ul_third_submenu_menuaside" className="fc">
          <li>
            Biostatistics, Epidemiology/Population Health, & Interpretation of
            the Medical Literature
          </li>
          <li>Social Sciences</li>
        </ul>
      </div>
    </aside>
  );
};

export default MenuAside;
