import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import App from "./App";
import Login from "./routes/Login/Login";
import React, { useEffect, useState } from "react";

const AppRouter = () => {
  const [received_auth_report, setReceived_auth_report] = useState({});
  ///////////////////////////Lifecycle functions///////////////////////////////
  useEffect(() => {});
  ///////////////////////////Variables and States///////////////////////////////

  const [connectionReport, setConnectionReport] = useState({
    is_loggedin: null,
  });
  ///////////////////////////Authentication and Connection Info RECEIVER///////////////////////////////

  const authentication_report_receiver = (authentication_report) => {
    setReceived_auth_report(authentication_report);
  };
  const connection_report_receiver = (props) => {
    setConnectionReport({
      isConnected: props.isConnected,
    });
  };

  ////////////////////////////////////PRIVATE ROUTE//////////////////////////////////////////////
  const PrivateRoute = ({ children, ...rest }) => {
    let memoryAuth = JSON.parse(sessionStorage.getItem("is_loggingin"));

    if (received_auth_report.is_authorized === true || memoryAuth === true) {
      sessionStorage.setItem("is_loggingin", true);
      return (
        <React.Fragment>
          <Route {...rest} render={() => children} />
          <Redirect />
        </React.Fragment>
      );
    } else {
      return <Redirect to="/login" />;
    }
  };

  return (
    <Router>
      <PrivateRoute
        exact
        path="/"
        received_auth_report={received_auth_report}
        component={() => (
          <App
            connection_report_receiver={connection_report_receiver}
            received_auth_report={received_auth_report}
          />
        )}
      />
      <Route exact path="/login">
        <Login
          // checkpoint={checkpoint}
          authentication_report_receiver={authentication_report_receiver}
        />
      </Route>
    </Router>
  );
};

export default AppRouter;
