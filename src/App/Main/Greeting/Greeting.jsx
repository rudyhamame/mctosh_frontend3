import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../Footer/Footer";
import Nav from "../../Header/Nav/Nav";

const Greeting = (props) => {
  console.log(props.state)
  return (
    <article id="Greeting_studysessions_article" className="fc">
      <section id="Greeting_preStart" className="fc slide-top">
        <div className="fc" style={{ alignItems: "center" }}>
          <h1>Hello {props.state.firstname},</h1>
          <h2>Let's start a new study session!</h2>
          {/* <button id="Greeting_preStart_button" className="fr">
            <Link to="/study">
              <i class="fas fa-stopwatch"></i> Start Timer
            </Link>
          </button> */}
          <button id="Greeting_preStart_button1" className="fr">
          <Link to="/study">
              <i class="fas fa-stopwatch"></i> Study tool
            </Link>
          </button>
          <button id="Greeting_preStart_button2" className="fr">
          <Link to="/studyplanner">
              <i class="fas fa-stopwatch"></i> Study organizer
            </Link>
          </button>
       
        </div>

        <div id="Greeting_preStart_reportDiv">
          <h3 style={{ textAlign: "center" }}>Previous Sessions</h3>
          <ul id="Greeting_studySessions_area" className="fc">
            {props.state.study_session &&
              props.state.study_session.length === 0 && (
                <div>There are no previous study sessions to show</div>
              )}
          </ul>
          <li id="Greeting_totalDuration_li"></li>
        </div>
      </section>
      <Nav path="/" />
    </article>
  );
};

export default Greeting;
