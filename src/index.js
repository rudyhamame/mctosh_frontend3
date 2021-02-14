import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter";
import Login from "./Login/Login";
import "./App/App.css";

if (JSON.parse(sessionStorage.getItem("state"))) {
  if (JSON.parse(sessionStorage.getItem("state")).isConnected === true) {
    ReactDOM.render(<AppRouter />, document.getElementById("root"));
  }
} else {
  ReactDOM.render(<Login />, document.getElementById("root"));
}
