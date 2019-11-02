import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Functions from "../utils/Functions.js";

const SignInForm = props => {
  let history = useHistory();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = event => {
    setCredentials({
      ...credentials,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  const attemptLogin = event => {
    event.preventDefault();

    const payLoad = {
      user: {
        email: credentials.email,
        password: credentials.password
      },
      authenticity_token: Functions.getMetaContent("csrf-token")
    };

    fetch("/users/sign_in", {
      method: "POST",
      body: JSON.stringify(payLoad),
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(ErrorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        if (body.id) {
          props.getIsSignedIn();
          history.push("/listings");
        } else {
          // todo
        }
      });
  };

  return (
    <form onSubmit={attemptLogin}>
      <h3>Log In</h3>
      <div className="row">
        <label className="small-12 columns">
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
          />
        </label>
        <label className="small-12 columns">
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </label>
        <button className="button" type="submit">
          Submit credentials
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
