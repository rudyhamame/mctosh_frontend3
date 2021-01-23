import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import IndexBiochemMolbio from "./pages/biochem_molbio/IndexBiochemMolbio";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/biochem_molbio" component={IndexBiochemMolbio} />
      </Switch>
    </Router>
  );
}
export default App;
