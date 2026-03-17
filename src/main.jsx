import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter";
import Login from "./Login/Login";
import "./App/App.css";

if (JSON.parse(sessionStorage.getItem("state"))) {
  // If there was an account logged in
  if (JSON.parse(sessionStorage.getItem("state")).isConnected === true) {
    ReactDOM.render(React.createElement(AppRouter), document.getElementById("root"));
  }
} else {
  // If there was no account logged in
  ReactDOM.render(React.createElement(Login), document.getElementById("root"));
}
