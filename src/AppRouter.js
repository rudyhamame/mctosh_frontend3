import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import App from "./App";
import Login from "./routes/Login/Login";
import React, { useState } from "react";
import Profile from "./static_components/Profile/Profile";

const AppRouter = () => {
  const [received_auth_report, setReceived_auth_report] = useState(
    JSON.parse(sessionStorage.getItem("auth_report")) //We put the browser memory as initial value so we hold the state after refreshing (the state is null)
  );
  ///////////////////////////Lifecycle functions///////////////////////////////
  // useEffect(() => {
  //   if (received_auth_report === null) {
  //     console.log("The report is null" + JSON.stringify(received_auth_report));
  //   } else {
  //     console.log(
  //       "The report is not null but, " + JSON.stringify(received_auth_report)
  //     );
  //   }
  // });
  ///////////////////////////Variables and States///////////////////////////////

  ///////////////////////////Authentication and Connection Info RECEIVER///////////////////////////////

  const auth_report_receiver = (incoming_authReport) => {
    sessionStorage.setItem("auth_report", JSON.stringify(incoming_authReport)); // Save the report object to browser memory
    setReceived_auth_report(JSON.parse(sessionStorage.getItem("auth_report"))); // set the state value to the receiver auth object from Login so we can refresh the component to show the App

    // console.log("save in memory: " + JSON.stringify(incoming_authReport));
    // console.log(
    //   "this is what in state after saving to memory : " +
    //     JSON.stringify(received_auth_report)
    // );
  };

  ////////////////////////////////////PRIVATE ROUTE//////////////////////////////////////////////
  const PrivateRoute = ({ children, ...rest }) => {
    if (
      received_auth_report !== null && // we set this check of null because the browser memory initially has null object
      received_auth_report.is_authorized === true
    ) {
      // It will work because we save the initial value of the received report state to be the one int he browser
      return <Route {...rest} render={() => children} />;
    } else {
      return <Redirect to="/" />;
    }
  };

  return (
    <Router>
      <PrivateRoute
        exact
        path="/"
        received_auth_report={received_auth_report} //passing the report from the Router to the App component
        component={() => <App received_auth_report={received_auth_report} />}
      />
      {received_auth_report === null && (
        <Route exact path="/">
          <Login auth_report_receiver={auth_report_receiver} />
        </Route>
      )}
      <PrivateRoute exact path="/profile" component={Profile} />
    </Router>
  );
};

export default AppRouter;
