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
    </div>
  ); 
}

export default App;
