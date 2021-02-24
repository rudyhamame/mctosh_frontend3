import React from "react";
import MountPosts from "./MountPosts/MountPosts";
import InputPost from "./InputPost/InputPost";
import Footer from "../../Footer/Footer";
import SearchPosts from "./InputPost/SearchPosts/SearchPosts";
import Header from "../../Header/Header";
const Posts = (props) => {
  return (
    <article id="Posts_article" className="fc">
      <section id="Posts_content_container" className="fc">
        <InputPost
          state={props.state}
          postingPost={props.postingPost}
          RetrievingMyPosts={props.RetrievingMyPosts}
          searchPosts={props.searchPosts}
          prepare_searchPosts={props.prepare_searchPosts}
        />
        <MountPosts
          app_posts_sorted={props.app_posts_sorted}
          state={props.state}
        />
      </section>

      <Footer />
    </article>
  );
};

export default Posts;
