import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Functions from "../utils/Functions.js";

const useStyles = makeStyles(theme => ({
  floatRightButton: {
    float: "right",
    marginTop: "1rem"
  },
  input: {
    display: "none"
  },
  container: {
    marginLeft: "25%",
    marginRight: "25%"
  },
  fullWidthTextInput: {
    width: "100%"
  },
  topRow: {
    marginTop: "1.5rem"
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
    <div>
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={attemptRegister}
      >
        <div className="row">
          <div className="columns small-12">
            <h3 className={classes.topRow}>Sign Up</h3>
            <TextField
              id="outlined-basic"
              label="Username"
              margin="normal"
              variant="filled"
              type="text"
              name="username"
              className={classes.fullWidthTextInput}
              value={newCredentials.username}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="columns small-12">
            <TextField
              id="outlined-basic"
              label="Email Address"
              margin="normal"
              variant="filled"
              type="text"
              name="email"
              className={classes.fullWidthTextInput}
              value={newCredentials.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="columns small-12">
            <TextField
              id="outlined-basic"
              label="Password"
              margin="normal"
              variant="filled"
              type="password"
              name="password"
              className={classes.fullWidthTextInput}
              value={newCredentials.password}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.floatRightButton}
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
