import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App/App";

const AppRouter = (props) => {
  return (
    <Router>
      <Route exact path="/">
        <App authReport={props.authReport} path="/" />
      </Route>
      <Route exact path="/study">
        <App authReport={props.authReport} path="/study" />
      </Route>
      <Route exact path="/profile">
        <App authReport={props.authReport} path="/profile" />
      </Route>
    </Router>
  );
};

export default AppRouter;
