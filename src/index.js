import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" component={Login}></Route>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
