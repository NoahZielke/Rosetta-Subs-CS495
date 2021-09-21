import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppHome from "./pages/AppHome";
import LandingPage from "./pages/LandingPage";
import TeamBios from "./pages/TeamBios";

function App() {
  return (
    <div className='App' style={{ margin: 0, padding: 0 }}>
      <Router>
          <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/home" exact component={LandingPage} />
              <Route path="/team-bios" exact component={TeamBios} />
              <Route path="/app-home" exact component={AppHome} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
