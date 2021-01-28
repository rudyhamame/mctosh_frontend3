import React from "react";
import Footer from "./static_components/Footer";
import Header from "./static_components/Header";
import Main from "./static_components/Main";
import HomeContent from "./content_components/home_content/HomeContent";

//........import CSS...........
import "./css/app.css";
import "./css/header.css";
import "./css/footer.css";
import "./css/aside.css";
import "./css/content.css";
import "./css/main.css";
import "./css/home_content.css";

//........Home Component...........
class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {
      date_now: new Date(),
      username: props.username,
      content_component: null,
    };
  }

  update_date = () => {
    setInterval(
      () =>
        this.setState({
          date_now: new Date(),
        }),
      1000
    );
  };

  componentDidMount() {
    this.update_date();
    this.setState({
      content_component: <HomeContent username={this.state.username} />,
    });
  }

  content_component_switcher = (props) => {
    this.setState({ content_component: props });
  };

  render() {
    return (
      <div id="app_page" className="fc">
        <Header
          content_component_switcher={this.content_component_switcher}
          username={this.state.username}
        />
        <Main
          content_component_switcher={this.content_component_switcher}
          content_component={this.state.content_component}
          username={this.state.username}
        />
        <Footer date_now={this.state.date_now} />
      </div>
    );
  }
}

export default Home;
