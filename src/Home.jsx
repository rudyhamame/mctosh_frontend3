import React from "react";
import "./css/app.css";
import Footer from "./static_components/Footer";
import Header from "./static_components/Header";
import Main from "./static_components/Main";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      content_component: null,
    };
  }
  content_component_switcher = (props) => {
    this.setState({ content_component: props });
  };
  render() {
    return (
      <div id="app">
        <Header content_component_switcher={this.content_component_switcher} />
        <Main
          content_component_switcher={this.content_component_switcher}
          content_component={this.state.content_component}
        />
        <Footer />
      </div>
    );
  }
}

export default Home;
