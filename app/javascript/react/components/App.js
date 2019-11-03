import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ListingIndexContainer from "./ListingIndexContainer";
import NavBar from "./NavBar";
import ListingShowContainer from "./ListingShowContainer";
import NewListingContainer from "./NewListingContainer";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";

export const App = props => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({});

  const getIsSignedIn = () => {
    fetch("/auth/is_signed_in")
      .then(response => response.json())
      .then(body => {
        if (body.signed_in) {
          setIsSignedIn(body.signed_in);
          setUser(body.user);
        }
      });
  };

  useEffect(() => {
    getIsSignedIn();
  }, []);

  //whenever we do a straight up component, you can't pass the component props so instead of using a componenet, we have to use render in order to render what component we want for the path and give it a prop like for const getIsSignedIn. render uses an anonymous function below.

  return (
    <div>
      <BrowserRouter>
        <header>
          <NavBar isSignedIn={isSignedIn} />
        </header>
        <Switch>
          <Route exact path="/" component={ListingIndexContainer} />
          <Route
            exact
            path="/login/"
            render={() => <LogInForm getIsSignedIn={getIsSignedIn} />}
          />
          <Route
            exact
            path="/signup"
            render={() => <SignUpForm getIsSignedIn={getIsSignedIn} />}
          />
          <Route exact path="/listings" component={ListingIndexContainer} />
          <Route exact path="/listings/new" component={NewListingContainer} />
          <Route exact path="/listings/:id" component={ListingShowContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
