import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FormControl, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Functions from "../utils/Functions.js";

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: "25%",
    marginRight: "25%"
  },
  fullWidthTextInput: {
    width: "100%"
  },
  topRow: {
    marginTop: "1.5rem"
  },
  floatRightButton: {
    float: "right",
    marginTop: "1rem"
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: 400
  },
  input: {
    display: "none"
  }
}));

const LogInForm = props => {
  const classes = useStyles();
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

    const payload = {
      user: {
        email: credentials.email,
        password: credentials.password
      },
      authenticity_token: Functions.getMetaContent("csrf-token")
    };

    fetch("/users/sign_in", {
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
    <form
      className={classes.container}
      noValidate
      autoComplete="off"
      onSubmit={attemptLogin}
    >
      <div className="row">
        <div className="columns small-12">
          <h3 className={classes.topRow}>Log In</h3>
          <TextField
            label="Email Address"
            margin="normal"
            variant="filled"
            type="email"
            name="email"
            className={classes.fullWidthTextInput}
            value={credentials.email}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="columns small-12">
          <TextField
            label="Password"
            margin="normal"
            variant="filled"
            type="password"
            name="password"
            className={classes.fullWidthTextInput}
            value={credentials.password}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="columns small-12">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.floatRightButton}
          >
            Log In
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LogInForm;
