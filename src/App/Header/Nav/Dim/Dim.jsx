import React from "react";

const Dim = () => {
  const dim = () => {
    let i_dim_menu = document.getElementById("Nav_dim_i");
    if (i_dim_menu.title === "unclicked") {
      i_dim_menu.title = "clicked";
      document.getElementById(
        "MountPosts_content_container"
      ).style.backgroundColor = "var(--special_black)";
      document.getElementById(
        "InputPost_textarea_container"
      ).style.backgroundColor = "var(--special_black)";
      document.getElementById(
        "InputPost_inputs_container"
      ).style.backgroundColor = "var(--special_black)";
    } else {
      i_dim_menu.title = "unclicked";
      document.getElementById(
        "MountPosts_content_container"
      ).style.backgroundColor = "var(--red)";
      document.getElementById(
        "InputPost_textarea_container"
      ).style.backgroundColor = "var(--red)";
      document.getElementById(
        "InputPost_inputs_container"
      ).style.backgroundColor = "var(--red)";
    }
  };
  return (
    <section id="Dim_article">
      <i
        id="Nav_dim_i"
        class="fas fa-adjust"
        title="unclicked"
        onClick={dim}
      ></i>
    </section>
  );
};

export default Dim;
