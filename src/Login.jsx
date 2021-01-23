import React from "react";
import "./login.css";
import App from "./App";
import ReactDOM from "react-dom";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username_correct: false,
      password_correct: false,
      isLogged: false,
      isLoading: false,
    };
  }

  fetchData = (event) => {
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
        let username_try = document.getElementById("username_input");
        let password_try = document.getElementById("password_input");
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
          alert("Login bad");
        } else {
          this.setState({
            isLogged: true,
            isLoading: false,
          });
          this.renderHome();
        }
      })

      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  addUser = (event) => {
    event.preventDefault();
    let newUser = document.getElementById("username_input");
    let newPassword = document.getElementById("password_input");
    let newEmail = document.getElementById("email_input");
    let newDOB = document.getElementById("dob_input");

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
    let signup_button = document.getElementById("signup");
    let login_button = document.getElementById("login");
    let login_title = document.getElementById("login_title");
    let signup_title = document.getElementById("signup_title");
    let email_input = document.getElementById("email_input");
    let dob_input = document.getElementById("dob_input");
    signup_button.style.display = "initial";
    signup_title.style.display = "none";
    login_button.style.display = "none";
    email_input.style.display = "initial";
    dob_input.style.display = "initial";
    login_title.style.display = "initial";
  };

  enableLogin = () => {
    let signup_button = document.getElementById("signup");
    let login_button = document.getElementById("login");
    let login_title = document.getElementById("login_title");
    let signup_title = document.getElementById("signup_title");
    let email_input = document.getElementById("email_input");
    let dob_input = document.getElementById("dob_input");
    signup_button.style.display = "none";
    signup_title.style.display = "initial";
    login_button.style.display = "initial";
    email_input.style.display = "none";
    dob_input.style.display = "none";
    login_title.style.display = "none";
  };
  renderHome = () => {
    ReactDOM.render(<App />, document.getElementById("root"));
  };

  componentDidUpdate = () => {
    sessionStorage.setItem("loginState", JSON.stringify(this.state.isLogged));
    if (this.state.isLogged === true) {
      this.renderHome();
    }
  };
  componentDidMount = () => {
    const loginData = sessionStorage.getItem("loginState");
    if (loginData) {
      this.setState({ isLogged: JSON.parse(loginData) });
    }
  };

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

  render() {
    return (
      <div id="login_div">
        {this.loader()}
        <header id="header_login">
          <h1>Study Planner</h1>
        </header>
        <div id="form_container" className="slide-top">
          <form id="login_form" action="">
            <input
              id="username_input"
              type="text"
              name="username"
              placeholder="username"
            />
            <input
              id="password_input"
              type="password"
              name="password"
              placeholder="password"
            />
            <input
              id="email_input"
              type="email"
              name="email"
              placeholder="email address"
              style={{ display: "none" }}
            />
            <input
              id="dob_input"
              type="date"
              name="dob"
              placeholder="date of birth"
              style={{ display: "none" }}
            />
            <input
              type="submit"
              name="submit"
              id="login"
              onClick={this.fetchData}
            />

            <input
              id="signup"
              type="submit"
              onClick={this.addUser}
              value="SignUp"
            />
          </form>
          <h4
            style={{ display: "none" }}
            id="login_title"
            onClick={this.enableLogin}
          >
            Log in?
          </h4>
          <h4 id="signup_title" onClick={this.enableSignup}>
            Sign up?
          </h4>
        </div>
        <footer id="login_footer">©2021 Rudy Hamame</footer>
      </div>
    );
  }
}
export default Login;
