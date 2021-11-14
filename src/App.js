import "./App.css";
import "../node_modules/bulma/css/bulma.min.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import calculatePrice from "./components/calculatePrice";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={calculatePrice} />
        </Switch>
      </BrowserRouter>
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <strong>Cargo Price Calculation & Order Tool</strong> by Furkan Gülsoy
          
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
