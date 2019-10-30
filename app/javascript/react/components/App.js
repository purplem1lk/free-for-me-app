import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { CssBaseline } from "@material-ui/core";

import ListingIndexContainer from "./ListingIndexContainer";
import NavBar from "./NavBar";

export const App = props => {
  return (
    <div>
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route exact path="/" component={ListingIndexContainer} />
          <Route exact path="/listings" component={ListingIndexContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
