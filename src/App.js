import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./Home";

function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home username={props.username} />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
