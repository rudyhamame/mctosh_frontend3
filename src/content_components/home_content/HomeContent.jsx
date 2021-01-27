const HomeContent = (props) => {
  return (
    <div id="content_home_welcome_container" className="fc">
      <section>
        <h1 id="h1_content_home_welcome">
          Hello {props.username}! Welcome to your profile on <br></br>
          <span style={{ fontFamily: "var(--pacifico)" }}>
            Step1 Study Planner
          </span>
        </h1>
      </section>

      <section>
        <p>
          Accorping to the imformation you posted in "To do menu", you have the
          following tasks for today:{" "}
        </p>
      </section>
    </div>
  );
};
export default HomeContent;
