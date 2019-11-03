import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FormControl, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Functions from "../utils/Functions.js";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: 400
  },
  button: {
    margin: theme.spacing(3)
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
      <h3>Log In</h3>
      <div className="row">
        <div>
          <TextField
            id="outlined-basic"
            label="Email Address"
            margin="normal"
            variant="outlined"
            type="email"
            name="email"
            className={classes.textField}
            value={credentials.email}
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
            value={credentials.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Log In
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LogInForm;
