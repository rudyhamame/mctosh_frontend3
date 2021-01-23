import React from "react";
import "../../home/app-engine/css/aside.css";
import "../../home/app-engine/css/content.css";
import "../../home/app-engine/css/main.css";
import HumanDevGen from "./HumanDevGen";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <main id="main_app">
      <HumanDevGen />
      <aside id="aside_main_app">
        <div id="aside_main_app_container">
          <h3>General Principles of Foundational Science</h3>
          <ul>
            <Link to="/biochem_molbio">
              <li>Biochemistry and molecular biology</li>
            </Link>
            <Link to="/bio_of_cells">
              <li>Biology of cells</li>
            </Link>
            <Link to="/human_devgen">
              <li>Human development and genetics</li>
            </Link>

            <Link to="/bio_of_tissue">
              <li>Biology of tissue response to disease</li>
            </Link>

            <Link to="/pharma_processes">
              <li>Pharmacodynamic and pharmacokinetic processes</li>
            </Link>

            <Link to="/micro_bio">
              <li>Microbial biology</li>
            </Link>

            <Link to="/age_related">
              <li>Normal age-related findings and care of the well patient</li>
            </Link>
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
    </main>
  );
};

export default Main;
