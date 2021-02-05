import "./greeting.css";

const Greeting = (props) => {
  return (
    <section id="greeting_sectionGreeting">
      <h1 id="h1_greeting_textGreeting">Hello {props.state.me.first_name}!</h1>
    </section>
  );
};
export default Greeting;
