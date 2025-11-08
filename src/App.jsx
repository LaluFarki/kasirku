import React, { Component } from "react";
import { BrowserRouter,
   Switch, 
   Route,
   } from "react-router-dom";
   import { NavbarComponent } from "./components";
  import { Home, Sukes } from "./pages";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sukses" component={Sukes} />
          </Switch>
        </main>
      </BrowserRouter>
    );  
  }
}
