import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Functions from "../utils/Functions.js";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(3)
  },
  input: {
    display: "none"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  }
}));

const SignUpForm = props => {
  const classes = useStyles();
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
        Accept: "application/json",
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
          // user successfully signed in, also add the mto chatkit.
          fetch("/chatkit/create_user", {
            method: "POST",
            body: JSON.stringify({
              id: `${body.id}`,
              username: newCredentials.username
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          }).then(() => {
            props.getIsSignedIn();
            history.push("/listings");
          });
        } else {
          // todo
        }
      });
  };

  return (
    <form
      className={classes.container}
      noValidate
      autoComplete="off"
      onSubmit={attemptRegister}
    >
      <h3>Sign Up</h3>
      <div className="row">
        <div>
          <TextField
            id="outlined-basic"
            label="Username"
            margin="normal"
            variant="outlined"
            type="text"
            name="username"
            className={classes.textField}
            value={newCredentials.username}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <TextField
            id="outlined-basic"
            label="Email Address"
            margin="normal"
            variant="outlined"
            type="text"
            name="email"
            className={classes.textField}
            value={newCredentials.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <TextField
            id="outlined-basic"
            label="Password"
            margin="normal"
            variant="outlined"
            type="password"
            name="password"
            className={classes.textField}
            value={newCredentials.password}
            onChange={handleInputChange}
          />
        </div>

        <button className="button" type="submit">
          Create Account
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
