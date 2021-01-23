import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

ReactDOM.render(<FirstRouter />, document.getElementById("root"));

function FirstRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
      <Redirect to="/" />
    </Router>
  );
}
export default FirstRouter;
