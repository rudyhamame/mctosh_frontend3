import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App/App";

const AppRouter = (props) => {
  return (
    <Router>
      <Route exact path="/">
        <App authReport={props.authReport} />
      </Route>
    </Router>
  );
};

export default AppRouter;
