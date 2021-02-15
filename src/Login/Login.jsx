import React, { useState } from "react";
import AppRouter from "../AppRouter";
import "../Login/login.css";
import ReactDOM from "react-dom";

const Login = () => {
  //.........................STATE.....................................//
  const [is_loading, setIs_loading] = useState(null);
  const [signup_ok, setSignup_ok] = useState(null);
  const [login_ok, setLogin_ok] = useState(null);
  const [authReport, setAuthReport] = useState(null);

  React.useEffect(() => {
    if (login_ok && authReport) {
      login_listener();
      sessionStorage.setItem("state", JSON.stringify(authReport));
    }
  });
  // //.................................Declaration......................//

  //.........................formControl & formControl (functions)..........................//

  const formControl = (text) => {
    let Login_firstname_input = document.getElementById(
      "Login_firstname_input"
    );
    let Login_lastname_input = document.getElementById("Login_lastname_input");
    let Login_email_input = document.getElementById("Login_email_input");
    let Login_dob_input = document.getElementById("Login_dob_input");
    let Login_signup_button = document.getElementById("Login_signup_button");
    let Login_login_button = document.getElementById("Login_login_button");
    let Login_loginShow_text = document.getElementById("Login_loginShow_text");
    let Login_signupShow_text = document.getElementById(
      "Login_signupShow_text"
    );
    switch (text) {
      case "signup":
        Login_firstname_input.style.display = "initial";
        Login_lastname_input.style.display = "initial";
        Login_email_input.style.display = "initial";
        Login_dob_input.style.display = "initial";
        Login_signup_button.style.display = "initial";
        Login_login_button.style.display = "none";
        Login_loginShow_text.style.display = "initial";
        Login_signupShow_text.style.display = "none";
        break;

      case "login":
        Login_signup_button.style.display = "none";
        Login_signupShow_text.style.display = "initial";
        Login_login_button.style.display = "initial";
        Login_email_input.style.display = "none";
        Login_dob_input.style.display = "none";
        Login_loginShow_text.style.display = "none";
        Login_firstname_input.style.display = "none";
        Login_lastname_input.style.display = "none";
        break;
    }
  };

  ////////////////////////////////////////////CHECK AND GET CREDENTIALS//////////////////////////////////////
  const login = (event) => {
    event.preventDefault();
    let Login_username_input = document.getElementById("Login_username_input");
    let Login_password_input = document.getElementById("Login_password_input");
    setIs_loading(true);
    let url = "https://backendstep1.herokuapp.com/api/user/login/";
    let req = new Request(url, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: Login_username_input.value,
        password: Login_password_input.value,
      }),
    });
    fetch(req)
      .then((response) => {
        if (response.status === 201) {
          setLogin_ok(true);
          return response.json(response);
        }
        if (response.status === 401) {
          setLogin_ok(false);
          setIs_loading(false);
          return response.json(response);
        }
      })
      .then((userdata) => {
        if (userdata.message === "Login successful") {
          setAuthReport({
            my_id: userdata.user._id,
            username: userdata.user.info.username,
            firstname: userdata.user.info.firstname,
            lastname: userdata.user.info.lastname,
            dob: userdata.user.info.dob,
            token: userdata.token,
            isConnected: true,
            notes: userdata.user.notes,
            friends: userdata.user.friends,
            friend_requests: userdata.user.friend_requests,
            notifications: userdata.user.notifications,
          });

          setLogin_ok(true);
        } else {
          setLogin_ok(false);
          setIs_loading(false);
        }
      });
  };
  //..............................................................................................
  /////////////////////////////////////////Login listener/////////////////////////////////////////
  const login_listener = () => {
    if (authReport) {
      console.log(authReport);
      document.getElementById("Login_loginFrom_form").style.height = "0";
      document.getElementById("Login_loginFrom_form").style.padding = "0";
      document.getElementById("Login_loginLogo_text").style.fontSize = "100pt";
      document.getElementById("Login_loginLogo_container").style.marginBottom =
        "150px";
      document.getElementById("Login_subLoginLogo_text").style.fontSize =
        "50pt";

      setTimeout(() => {
        setIs_loading(false);
        ReactDOM.render(<AppRouter />, document.getElementById("root"));
      }, 5000);
    }
  };
  //.............................................................................................................
  ////////////////////////////////////////////SIGN UP AS USER AND PROFILE//////////////////////////////////////
  const signup = (event) => {
    event.preventDefault();
    setIs_loading(true);
    let Login_username_input = document.getElementById("Login_username_input");
    let Login_password_input = document.getElementById("Login_password_input");
    let Login_firstname_input = document.getElementById(
      "Login_firstname_input"
    );
    let Login_lastname_input = document.getElementById("Login_lastname_input");
    let Login_email_input = document.getElementById("Login_email_input");
    let Login_dob_input = document.getElementById("Login_dob_input");
    //................................user....................................................
    const url = "https://backendstep1.herokuapp.com/api/user/signup";
    const options = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: Login_username_input.value,
        password: Login_password_input.value,
        firstname: Login_firstname_input.value,
        lastname: Login_lastname_input.value,
        email: Login_email_input.value,
        dob: Login_dob_input.value,
      }),
    };
    let req = new Request(url, options);
    fetch(req)
      .then((response) => {
        if (response.status === 201) {
          document.getElementById("Login_loginFrom_form").reset();
          setIs_loading(false);
          setSignup_ok(true);
          document.getElementById("Login_loginFrom_form").reset();
          return response.json(response);
        }
        if (response.status === 409) {
          setIs_loading(false);
          setSignup_ok(false);
          return response.json(response);
        }
        if (response.status === 500) {
          setIs_loading(false);
          setSignup_ok(false);
          return response.json(response);
        }
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log("error:", err.message);
      });
  };

  ////////////////////////////////////////////Create PROFILE//////////////////////////////////////

  return (
    <article id="Login_article" className="fc">
      <main id="Login_main" className="fc">
        <section id="Login_loginLogo_container">
          <h1 id="Login_loginLogo_text">MED</h1>
          <h4 id="Login_subLoginLogo_text">study planner</h4>
        </section>
        <section id="Login_loginForm_container">
          <form id="Login_loginFrom_form" className="fc">
            <input
              id="Login_firstname_input"
              type="text"
              style={{ display: "none" }}
              placeholder="first name"
            />
            <input
              id="Login_lastname_input"
              type="text"
              style={{ display: "none" }}
              placeholder="last name"
            />
            <input
              id="Login_username_input"
              type="text"
              placeholder="username"
            />
            <input
              id="Login_password_input"
              type="password"
              placeholder="password"
            />
            <input
              id="Login_email_input"
              type="email"
              placeholder="email address"
              style={{ display: "none" }}
            />
            <input
              id="Login_dob_input"
              type="date"
              placeholder="date of birth"
              style={{ display: "none" }}
            />
            <button id="Login_login_button" onClick={login}>
              Log in
            </button>

            <button
              id="Login_signup_button"
              onClick={signup}
              style={{ display: "none" }}
            >
              Sign up
            </button>
            <h4
              style={{ display: "none" }}
              id="Login_loginShow_text"
              onClick={() => formControl("login")}
            >
              Log in?
            </h4>
            <h4
              id="Login_signupShow_text"
              onClick={() => formControl("signup")}
            >
              Sign up?
            </h4>
            <h4 style={{ overflowWrap: "break-word", color: "red" }}>
              {login_ok === false &&
                "The password you entered is not correct, please try again"}
              {signup_ok && "You have successfully signed up!"}
              {signup_ok === false &&
                "Please make sure you entered valid information"}
            </h4>
          </form>
        </section>
      </main>
      <footer id="Login_footer">
        <section id="Login_copyright_container">
          <h4 id="Login_copyright_text">©2021 Rudy Hamame</h4>
        </section>
      </footer>
      {is_loading === true && (
        <div id="Login_loaderImg_div" className="fc">
          <img src="/img/loader.gif" alt="" width="100px" />
        </div>
      )}
    </article>
  );
};

export default Login;
