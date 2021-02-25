import React from "react";

const SearchPosts = (props) => {
  let SearchPosts_keyword = document.getElementById("SearchPosts_keyword");
  let SearchPosts_subject = document.getElementById("SearchPosts_subject");
  let SearchPosts_category = document.getElementById("SearchPosts_category");

  ///////////////////////////SEATCH FOR USERS TO BE FRIENDS///////////////

  const openSearch = () => {
    document.getElementById("SearchPosts_content_container").style.display =
      "flex";
    document.getElementById("SearchPosts_control_open_icon").style.display =
      "none";
    document.getElementById("SearchPosts_control_close_icon").style.display =
      "inline";
    document.getElementById("Friends_article").style.display = "flex";
    document.getElementById("Terminology_article").style.display = "flex";
  };
  const closeSearch = () => {
    document.getElementById("SearchPosts_content_container").style.display =
      "none";
    document.getElementById("SearchPosts_control_open_icon").style.display =
      "inline";
    document.getElementById("SearchPosts_control_close_icon").style.display =
      "none";
    document.getElementById("Friends_article").style.display = "none";
    document.getElementById("Terminology_article").style.display = "none";
  };

  return (
    <article className="fc" id="SearchPosts_article">
      <section id="SearchPosts_control_icon_container">
        <i
          id="SearchPosts_control_open_icon"
          onClick={openSearch}
          class="fas fa-sort-up"
        ></i>
        <i
          id="SearchPosts_control_close_icon"
          onClick={closeSearch}
          class="fas fa-sort-down"
        ></i>
      </section>
      <section id="SearchPosts_content_container" className="fr">
        <section id="SearchPosts_category_container" className="fr">
          <select id="SearchPosts_category">
            <option value="" disabled selected hidden>
              Search by category
            </option>
            <option value="General Principles">General Principles</option>
            <option value="Individual Organ">Individual Organ</option>
          </select>
        </section>
        <section id="SearchPosts_subject_container" className="fr">
          <select id="SearchPosts_subject" name="subject">
            <option value="" disabled selected hidden>
              Search by subject
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
        </section>
        <section id="SearchPosts_keyword_container" className="fr">
          <input
            id="SearchPosts_keyword"
            type="text"
            placeholder="Search by keyword"
          />
        </section>
        <section id="SearchPosts_Buttons_container" className="fr">
          <button
            id="SearchPosts_searchButton"
            onClick={() => {
              props.prepare_searchPosts(
                SearchPosts_keyword.value,
                SearchPosts_subject.value,
                SearchPosts_category.value
              );
            }}
          >
            Search
          </button>
          <button
            id="SearchPosts_clearButton"
            onClick={() => {
              window.location.reload();
            }}
          >
            Reset
          </button>
        </section>
      </section>
    </article>
  );
};

export default SearchPosts;
