import React from "react";

const Dim = () => {
  const dim = () => {
    let i_dim_menu = document.getElementById("Nav_dim_i");
    if (i_dim_menu.title === "unclicked") {
      i_dim_menu.title = "clicked";
      document.documentElement.style.setProperty("--special_black", "#1877f2");
      document.documentElement.style.setProperty("--black2", "var(--white)");
    } else {
      i_dim_menu.title = "unclicked";
      document.documentElement.style.setProperty("--special_black", "#282828");
      document.documentElement.style.setProperty("--black2", "#3a3b3c");
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
