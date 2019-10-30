import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ListingIndexContainer from "./ListingIndexContainer";

export const App = props => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ListingIndexContainer} />
          <Route exact path="/listings" component={ListingIndexContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
