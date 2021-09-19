import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className='App' style={{ margin: 0, padding: 0 }}>
      <Switch>
        <Route path='/about'>{/* <About/> */}</Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
