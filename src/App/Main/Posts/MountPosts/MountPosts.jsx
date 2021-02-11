import React from "react";
import InputPost from "../InputPost/InputPost";

const MountPosts = () => {
  return (
    <article id="fetching_out_content_container" className="fc">
      <section id="input_form_fetching_out_content_container" className="fc">
        <InputPost />
        <ul></ul>
      </section>
    </article>
  );
};

export default MountPosts;
