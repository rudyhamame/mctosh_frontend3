//...........import..................
import React from "react";
import "./login.css";
import App from "./App";
import ReactDOM from "react-dom";

//...........component..................
class Login extends React.Component {
  //..........states...........
  constructor() {
    super();
    this.state = {
      username_correct: false,
      password_correct: false,
      isLogged: false,
      isLoading: false,
      badAuth: null,
      username: null,
    };
  }
  //..........GET Route...........
  get_login_data = (event) => {
    this.setState({
      isLoading: true,
    });
    event.preventDefault();
    const url = "https://backendstep1.herokuapp.com/login";
    let req = new Request(url, { method: "GET", mode: "cors" });
    fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("BAD HTTP!");
        }
      })
      .then((jsonData) => {
        let username_try = document.getElementById("username_login_input");
        let password_try = document.getElementById("password_login_input");
        let flag = true;
        for (var i = 0; i < jsonData.length && flag === true; i++) {
          if (
            jsonData[i].username === username_try.value &&
            jsonData[i].password === password_try.value
          ) {
            this.setState({
              username_correct: true,
              password_correct: true,
            });
            flag = false;
          }
        }
        if (
          this.state.username_correct === false &&
          this.state.password_correct === false
        ) {
          this.setState({
            isLoading: false,
            badAuth:
              "The password you entered is not correct, please try again",
          });
        } else {
          this.setState({
            isLogged: true,
            isLoading: false,
            username: username_try.value,
          });
          this.renderHome();
        }
      })

      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  //..........POST Route...........
  post_signup_data = (event) => {
    event.preventDefault();
    let newUser = document.getElementById("username_login_input");
    let newPassword = document.getElementById("password_login_input");
    let newEmail = document.getElementById("email_signup_input");
    let newDOB = document.getElementById("dob_signup_input");

    let url = "https://backendstep1.herokuapp.com/login";
    let options = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        username: newUser.value,
        password: newPassword.value,
        email: newEmail.value,
        dob: newDOB.value,
      }), // body data type must match "Content-Type" header
    };
    newUser.value = "";
    newPassword.value = "";
    newEmail.value = "";
    newDOB.value = "";

    let req = new Request(url, options);

    fetch(req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("bad Http");
        }
      })
      .catch((err) => {
        console.log("error:", err.message);
      });
  };
  enableSignup = () => {
    let signup_button = document.getElementById("submit_signup_input");
    let login_button = document.getElementById("submit_login_input");
    let login_title = document.getElementById("login_form_button");
    let signup_title = document.getElementById("signup_form_button");
    let email_input = document.getElementById("email_signup_input");
    let dob_input = document.getElementById("dob_signup_input");
    signup_button.style.display = "initial";
    signup_title.style.display = "none";
    login_button.style.display = "none";
    email_input.style.display = "initial";
    dob_input.style.display = "initial";
    login_title.style.display = "initial";
  };

  enableLogin = () => {
    let signup_button = document.getElementById("submit_signup_input");
    let login_button = document.getElementById("submit_login_input");
    let login_title = document.getElementById("login_form_button");
    let signup_title = document.getElementById("signup_form_button");
    let email_input = document.getElementById("email_signup_input");
    let dob_input = document.getElementById("dob_signup_input");
    signup_button.style.display = "none";
    signup_title.style.display = "initial";
    login_button.style.display = "initial";
    email_input.style.display = "none";
    dob_input.style.display = "none";
    login_title.style.display = "none";
  };

  //.....Home page after successful login..........
  renderHome = () => {
    ReactDOM.render(
      <App username={this.state.username} />,
      document.getElementById("root")
    );
  };

  //.....functions when a state of component changes..........
  componentDidUpdate = () => {
    sessionStorage.setItem("loginState", JSON.stringify(this.state.isLogged));
    sessionStorage.setItem("username", JSON.stringify(this.state.username));

    if (this.state.isLogged === true) {
      this.renderHome();
    }
  };

  //.....functions when component mounted..........
  componentDidMount = () => {
    const loginData = sessionStorage.getItem("loginState");
    const usernameData = sessionStorage.getItem("username");
    if (loginData) {
      this.setState({
        isLogged: JSON.parse(loginData),
        username: JSON.parse(usernameData),
      });
    }
  };

  //.....loader function..........
  loader = () => {
    while (this.state.isLoading) {
      return (
        <div
          style={{
            fontSize: "20pt",
            display: "flex",
            position: "absolute",
            top: "0",
            bottom: "0",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
            zIndex: "100",
          }}
        >
          <img src="/img/loader.gif" alt="" width="70px" />
        </div>
      );
    }
  };

  //.....Reander Login HTML..........
  render() {
    return (
      <div id="login_page" className="fc">
        {this.state.isLoading && this.loader()}
        <section id="header_loginform_container" className="fc">
          <header id="header_login">
            <h1 id="h1_header_login">Study Planner</h1>
          </header>
          <form id="login_form" className="fc">
            <input
              id="username_login_input"
              type="text"
              name="username"
              placeholder="username"
            />
            <input
              id="password_login_input"
              type="password"
              name="password"
              placeholder="password"
            />
            <input
              id="email_signup_input"
              type="email"
              name="email"
              placeholder="email address"
              style={{ display: "none" }}
            />
            <input
              id="dob_signup_input"
              type="date"
              name="dob"
              placeholder="date of birth"
              style={{ display: "none" }}
            />
            <input
              type="submit"
              name="submit"
              id="submit_login_input"
              onClick={this.get_login_data}
            />

            <input
              id="submit_signup_input"
              type="submit"
              onClick={this.post_signup_data}
              value="SignUp"
            />
            <h4
              style={{ display: "none" }}
              id="login_form_button"
              onClick={this.enableLogin}
            >
              Log in?
            </h4>
            <h4 id="signup_form_button" onClick={this.enableSignup}>
              Sign up?
            </h4>
            <h4 style={{ color: "red" }}>{this.state.badAuth}</h4>
          </form>
        </section>
        <footer id="footer_login">
          <h4 id="h4_footer_login">©2021 Rudy Hamame</h4>
        </footer>
      </div>
    );
  }
}
export default Login;
