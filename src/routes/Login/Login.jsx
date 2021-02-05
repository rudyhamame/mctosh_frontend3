import React, { useEffect, useState } from "react";
import "./Login.css";

const Login = (props) => {
  const [is_fetching, setIs_fetching] = useState(null);
  const [signup_ok, setSignup_ok] = useState(null);
  const [login_ok, setLogin_ok] = useState(null);

  ////////////////////////////////////////////STYLE FUNCTIONS//////////////////////////////////////

  const enableSignup = () => {
    let firstname_input = document.getElementById("firstname_login_input");
    let lastname_input = document.getElementById("lastname_login_input");
    let signup_button = document.getElementById("submit_signup_input");
    let login_button = document.getElementById("submit_login_input");
    let login_title = document.getElementById("login_form_button");
    let signup_title = document.getElementById("signup_form_button");
    let email_input = document.getElementById("email_signup_input");
    let dob_input = document.getElementById("dob_signup_input");
    firstname_input.style.display = "initial";
    lastname_input.style.display = "initial";
    signup_button.style.display = "initial";
    signup_title.style.display = "none";
    login_button.style.display = "none";
    email_input.style.display = "initial";
    dob_input.style.display = "initial";
    login_title.style.display = "initial";
  };

  const enableLogin = () => {
    let signup_button = document.getElementById("submit_signup_input");
    let login_button = document.getElementById("submit_login_input");
    let login_title = document.getElementById("login_form_button");
    let signup_title = document.getElementById("signup_form_button");
    let email_input = document.getElementById("email_signup_input");
    let dob_input = document.getElementById("dob_signup_input");
    let firstname = document.getElementById("firstname_login_input");
    let lastname = document.getElementById("lastname_login_input");
    signup_button.style.display = "none";
    signup_title.style.display = "initial";
    login_button.style.display = "initial";
    email_input.style.display = "none";
    dob_input.style.display = "none";
    login_title.style.display = "none";
    firstname.style.display = "none";
    lastname.style.display = "none";
    this.setState({
      signup_ok: null,
    });
  };

  ////////////////////////////////////////////CHECK AND GET CREDENTIALS//////////////////////////////////////
  const checkandGet_Credentials = (event) => {
    setSignup_ok(null);
    let username_try = document.getElementById("username_login_input");
    let password_try = document.getElementById("password_login_input");
    setIs_fetching(true);
    event.preventDefault();
    let url =
      "https://backendstep1.herokuapp.com/api/user/credentials?username=" +
      username_try.value;
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
        if (
          jsonData.password === password_try.value &&
          jsonData.username === username_try.value
        ) {
          let friends_list_ids = [];
          jsonData.friends_list.forEach((friend) =>
            friends_list_ids.push(friend.friend_id)
          );
          authentication_report_sender({
            username: jsonData.username,
            user_id: jsonData._id,
            first_name: jsonData.first_name,
            last_name: jsonData.last_name,
            friends_list: friends_list_ids,
            is_authorized: true,
          });

          setIs_fetching(false);
          setLogin_ok(true);
        } else {
          setIs_fetching(false);
          setLogin_ok(false);
        }
      })
      .catch((err) => {
        setIs_fetching(false);
        if (err.message === "Cannot read property 'credentials' of null")
          setLogin_ok(false);

        console.log("Error", err.message);
      });
  };

  ////////////////////////////////////////////AUTHENTICATION REPORT SENDER//////////////////////////////////////
  const authentication_report_sender = (auth) => {
    props.auth_report_receiver(auth);
  };

  ////////////////////////////////////////////SIGN UP//////////////////////////////////////
  const sign_up = (event) => {
    setIs_fetching(true);
    event.preventDefault();
    let firstname = document.getElementById("firstname_login_input");
    let lastname = document.getElementById("lastname_login_input");
    let username = document.getElementById("username_login_input");
    let password = document.getElementById("password_login_input");
    let email = document.getElementById("email_signup_input");
    let dob = document.getElementById("dob_signup_input");
    let signup_button = document.getElementById("submit_signup_input");
    let login_button = document.getElementById("submit_login_input");
    let login_title = document.getElementById("login_form_button");

    const url = "https://backendstep1.herokuapp.com/user/new";
    const options = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        first_name: firstname.value,
        last_name: lastname.value,
        email: email.value,
        dob: dob.value,
      }),
    };
    let req = new Request(url, options);
    fetch(req)
      .then((response) => {
        if (response.ok) {
          firstname.style.display = "none";
          lastname.style.display = "none";
          email.style.display = "none";
          dob.style.display = "none";
          signup_button.style.display = "none";
          login_button.style.display = "initial";
          login_title.style.display = "none";
          setSignup_ok(true);
          setIs_fetching(false);
          return response.json();
        } else {
          setSignup_ok(false);
          setIs_fetching(false);

          throw new Error("BAD HTTP!");
        }
      })
      .catch((err) => {
        setIs_fetching(false);
        console.log("error:", err.message);
      })
      .finally(() => {
        username.value = "";
        password.value = "";
        firstname.value = "";
        lastname.value = "";
        email.value = "";
        dob.value = "";
      });
  };

  ////////////////////////////////////////////RENDER//////////////////////////////////////

  return (
    <div id="login_page" className="fc">
      {is_fetching === true && (
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
      )}
      <section id="header_loginform_container" className="fc">
        <header id="header_login">
          <h1 id="h1_header_login">
            USMLE Step1 <br></br>
            <span
              style={{
                fontFamily: "'Pacifico', cursive",
                fontWeight: "300",
                fontSize: "30pt",
                color: "var(--gray_for_read)",
              }}
            >
              study planner
            </span>
          </h1>
        </header>
        <form id="login_form" className="fc">
          <input
            id="firstname_login_input"
            type="text"
            name="firstname"
            style={{ display: "none" }}
            placeholder="first name"
          />
          <input
            id="lastname_login_input"
            type="text"
            name="lastname"
            style={{ display: "none" }}
            placeholder="last name"
          />
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
            onClick={checkandGet_Credentials}
          />

          <input
            id="submit_signup_input"
            type="submit"
            onClick={sign_up}
            value="SignUp"
          />
          <h4
            style={{ display: "none" }}
            id="login_form_button"
            onClick={enableLogin}
          >
            Log in?
          </h4>
          <h4 id="signup_form_button" onClick={enableSignup}>
            Sign up?
          </h4>
          <h4 style={{ color: "red" }}>
            {login_ok === false &&
              "The password you entered is not correct, please try again"}
            {signup_ok && "You have successfully signed up! You can now log in"}
            {signup_ok === false && (
              <span style={{ overflowWrap: "break-word" }}>
                "Please make sure you entered valid information"
              </span>
            )}
          </h4>
        </form>
      </section>
      <footer id="footer_login">
        <h4 id="h4_footer_login">©2021 Rudy Hamame</h4>
      </footer>
    </div>
  );
};

export default Login;
