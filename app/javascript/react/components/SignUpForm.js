import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Functions from "../utils/Functions.js";

const SignUpForm = props => {
  let history = useHistory();
  const [newCredentials, setNewCredentials] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleInputChange = event => {
    setNewCredentials({
      ...newCredentials,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  const attemptRegister = event => {
    event.preventDefault();

    const payload = {
      user: {
        email: newCredentials.email,
        uid: newCredentials.email,
        password: newCredentials.password,
        password_confirmation: newCredentials.password,
        username: newCredentials.username,
        provider: "email"
      },
      authenticity_token: Functions.getMetaContent("csrf-token")
    };

    fetch("users.json", {
      method: "POST",
      body: JSON.stringify(payload),
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
          const error = new Error(errorMessage);
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
    <form onSubmit={attemptRegister}>
      <h3>Sign Up</h3>
      <div className="row">
        <label className="small-12 columns">
          Username:
          <input
            type="text"
            name="username"
            value={newCredentials.username}
            onChange={handleInputChange}
          />
        </label>

        <label className="small-12 columns">
          Email Address:
          <input
            type="text"
            name="email"
            value={newCredentials.email}
            onChange={handleInputChange}
          />
        </label>

        <label className="small-12 columns">
          Password:
          <input
            type="password"
            name="password"
            value={newCredentials.password}
            onChange={handleInputChange}
          />
        </label>

        <button className="button" type="submit">
          Create Account
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
