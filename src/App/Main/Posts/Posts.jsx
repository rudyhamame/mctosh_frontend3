import React from "react";
import MountPosts from "./MountPosts/MountPosts";
import InputPost from "./InputPost/InputPost";
const Content = (props) => {
  return (
    <article id="Posts_article" className="fc">
      <section id="Posts_content_container" className="fc">
        <InputPost state={props.state} postingPost={props.postingPost} />
        <MountPosts />
      </section>
    </article>
  );
};

export default Content;
