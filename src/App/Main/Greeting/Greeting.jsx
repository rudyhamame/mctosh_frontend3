const Greeting = (props) => {
  return (
    <section id="greeting_sectionGreeting">
      <h1 id="h1_greeting_textGreeting">Hello {props.state.user_firstname}!</h1>
    </section>
  );
};
export default Greeting;
