import "./greeting.css";

const Greeting = (props) => {
  return (
    <div id="centent_page" className="fc">
      <article id="greeting_articleGreeting" className="fc">
        <section id="greeting_sectionGreeting" className="fc">
          <h1 id="h1_greeting_textGreeting">
            Hello {props.username}! Welcome to your profile on <br></br>
            <span style={{ fontFamily: "var(--pacifico)" }}>
              Step1 Study Planner
            </span>
          </h1>
        </section>
        <section id="content_sectionGreeting">
          <p>
            According to the information you posted in "To do menu", you have
            the following tasks to do for today:
          </p>
          <ol id="ol_table_homecontent"></ol>
        </section>
      </article>
    </div>
  );
};
export default Greeting;
