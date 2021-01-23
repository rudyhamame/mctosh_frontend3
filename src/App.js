import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import IndexBiochemMolbio from "./pages/biochem_molbio/IndexBiochemMolbio";
import IndexBioOfCells from "./pages/bio_of_cells/IndexBioOfCells";
import IndexHumanDevGen from "./pages/human_devgen/IndexHumanDevGen";

import Home from "./Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/biochem_molbio" component={IndexBiochemMolbio} />
        <Route exact path="/bio_of_cells" component={IndexBioOfCells} />
        <Route exact path="/human_devgen" component={IndexHumanDevGen} />
      </Switch>
    </Router>
  );
}
export default App;
