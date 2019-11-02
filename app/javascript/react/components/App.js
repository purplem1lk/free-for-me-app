import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ListingIndexContainer from "./ListingIndexContainer";
import NavBar from "./NavBar";
import ListingShowContainer from "./ListingShowContainer";
import NewListingContainer from "./NewListingContainer";
import SignInForm from "./SignInForm";

export const App = props => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("/auth/is_signed_in")
      .then(response => response.json())
      .then(body => {
        if (body.signed_in) {
          setIsSignedIn(body.signed_in);
          setUser(body.user);
        }
      });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <header>
          <NavBar isSignedIn={isSignedIn} />
        </header>
        <Switch>
          <Route exact path="/" component={ListingIndexContainer} />
          <Route exact path="/login/" component={SignInForm} />
          <Route exact path="/listings" component={ListingIndexContainer} />
          <Route exact path="/listings/new" component={NewListingContainer} />
          <Route exact path="/listings/:id" component={ListingShowContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
