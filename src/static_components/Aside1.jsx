import React from "react";
import BiochemMolbioIndex from "../content_components/biochem_molbio/BiochemMolbioIndex";
import BioOfCellsIndex from "../content_components/bio_of_cells/BioOfCellsIndex";
import HumanDevGenIndex from "../content_components/human_devgen/HumanDevGenIndex";

const Aside1 = (props) => {
  return (
    <aside id="aside_main_app">
      <div id="aside_main_app_container">
        <h3>General Principles of Foundational Science</h3>
        <ul>
          <li
            onClick={() =>
              props.content_component_switcher(<BiochemMolbioIndex />)
            }
          >
            Biochemistry and molecular biology
          </li>

          <li
            onClick={() =>
              props.content_component_switcher(
                <BioOfCellsIndex
                  content_component_switcher={props.content_component_switcher}
                />
              )
            }
          >
            Biology of cells
          </li>
          <li
            onClick={() =>
              props.content_component_switcher(<HumanDevGenIndex />)
            }
          >
            Human development and genetics
          </li>

          <li>Biology of tissue response to disease</li>

          <li>Pharmacodynamic and pharmacokinetic processes</li>

          <li>Microbial biology</li>

          <li>Normal age-related findings and care of the well patient</li>
        </ul>
        <h3>Organ System</h3>
        <ul>
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
        <h3>Medical Literature</h3>
        <ul>
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

export default Aside1;
