import React from "react";
import MountPosts from "./MountPosts/MountPosts";
import InputPost from "./InputPost/InputPost";
const Content = (props) => {
  const [isFetching, setIsFetching] = React.useState(false);
  let i_close_up_control_greetingArticle = document.getElementById(
    "i_close_up_control_greetingArticle"
  );
  let i_open_up_control_greetingArticle = document.getElementById(
    "i_open_up_control_greetingArticle"
  );
  let i_close_down_control_greetingArticle = document.getElementById(
    "i_close_down_control_greetingArticle"
  );
  let i_open_down_control_greetingArticle = document.getElementById(
    "i_open_down_control_greetingArticle"
  );
  let fetching_out_page = document.getElementById("fetching_out_page");
  let control_down_greetingArticle = document.getElementById(
    "control_down_greetingArticle"
  );
  let control_up_greetingArticle = document.getElementById(
    "control_up_greetingArticle"
  );
  let keyword_search_NotesAside = document.getElementById(
    "keyword_search_NotesAside"
  );
  let input_keyword_search = document.getElementById("input_keyword_search");
  function openGreeting() {
    i_close_up_control_greetingArticle.style.display = "none";
    i_open_up_control_greetingArticle.style.display = "inline";
    i_close_down_control_greetingArticle.style.display = "inline";
    i_open_down_control_greetingArticle.style.display = "none";
    control_down_greetingArticle.style.display = "none";
    control_up_greetingArticle.style.display = "none";
    fetching_out_page.style.height = "100%";
    document.documentElement.style.setProperty("--blue", "#282828");
    keyword_search_NotesAside.style.backgroundColor = "var(--black)";
    input_keyword_search.style.backgroundColor = "var(--black2)";
  }
  function closeGreeting() {
    fetching_out_page.style.height = "0";
    i_close_up_control_greetingArticle.style.display = "inline";
    i_open_up_control_greetingArticle.style.display = "none";
    i_close_down_control_greetingArticle.style.display = "none";
    i_open_down_control_greetingArticle.style.display = "inline";
    control_down_greetingArticle.style.borderTop =
      "dotted rgba(0, 0, 0, 0.137) 4px";
    control_up_greetingArticle.style.backgroundColor = "var(--blue)";
    control_down_greetingArticle.style.backgroundColor = "var(--blue)";
    document.documentElement.style.setProperty("--blue", "#1877f2");
  }

  return (
    <div id="content_main_page" className="fc">
      {isFetching && props.loader()}
      <div id="centent_page" className="fc">
        <article id="greeting_articleGreeting" className="fc">
          <section id="content_articleGreeting" className="fr">
            <InputPost />
            fetchData={props.fetchData}
            state={props.state}
            setIsFetching={setIsFetching}
            />
          </section>
        </article>
        <section
          id="control_up_greetingArticle"
          title="unclicked"
          onClick={openGreeting}
          onDoubleClick={closeGreeting}
        >
          <i
            class="fas fa-arrow-up"
            id="i_close_up_control_greetingArticle"
            onClick={openGreeting}
          ></i>
          <i
            class="fas fa-arrow-down"
            id="i_open_up_control_greetingArticle"
            onClick={closeGreeting}
            style={{ display: "none" }}
          ></i>
        </section>
        <section
          id="control_down_greetingArticle"
          title="unclicked"
          onClick={openGreeting}
          onDoubleClick={closeGreeting}
        >
          <i
            class="fas fa-arrow-down"
            id="i_open_down_control_greetingArticle"
            onClick={openGreeting}
          ></i>
          <i
            class="fas fa-arrow-up"
            id="i_close_down_control_greetingArticle"
            onClick={closeGreeting}
            style={{ display: "none" }}
          ></i>
        </section>
        <section id="cover_content"></section>
        <article id="fetching_out_page" className="fc">
          <MountPosts />
        </article>
      </div>
    </div>
  );
};

export default Content;
