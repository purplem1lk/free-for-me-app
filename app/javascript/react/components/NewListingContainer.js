import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { isEmpty } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import ListingIndexContainer from "./ListingIndexContainer";

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

const NewListingContainer = props => {
  const classes = useStyles();
  const fileInput = useRef();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [newListing, setNewListing] = useState({
    title: "",
    description: "",
    postal_code: ""
  });

  const validForSubmission = () => {
    let submitErrors = {};
    const requiredFields = ["title", "description", "postal_code"];
    requiredFields.forEach(field => {
      if (newListing[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "can't be blank"
        };
      }
    });

    setErrors(submitErrors);
    return isEmpty(submitErrors);
  };

  const postNewListing = async () => {
    event.preventDefault();

    let uploadUrl = "";
    if (fileInput.current.files[0]) {
      const responsePayload = await fetch("/s3/direct_post").then(response =>
        response.json()
      );

      const url = responsePayload.url;
      const formData = new FormData();

      Object.keys(responsePayload.fields).forEach(key => {
        formData.append(key, responsePayload.fields[key]);
      });

      formData.append("file", fileInput.current.files[0]);

      const xmlResponse = await fetch(url, {
        method: "POST",
        body: formData
      }).then(response => response.text());

      uploadUrl = new DOMParser()
        .parseFromString(xmlResponse, "application/xml")
        .getElementsByTagName("Location")[0].textContent;
    }

    let payload = {
      title: newListing.title,
      description: newListing.description,
      postal_code: newListing.postal_code
    };

    if (uploadUrl) {
      payload.photo = uploadUrl;
    }

    if (validForSubmission()) {
      fetch("/api/v1/listings", {
        credentials: "same-origin",
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
            setNewListing(newListing);
            history.push(`/listings/${body.id}`);
          } else {
            setErrors(body);
          }
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  };

  const handleInputChange = event => {
    setNewListing({
      ...newListing,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  const clearForm = event => {
    event.preventDefault();
    setNewListing({
      title: "",
      description: "",
      postal_code: ""
    });
    setErrors({});
  };

  return (
    <div className="form-background">
      <div className="form-page">
        <div className="row">
          <form className="small-12 medium-9 columns" onSubmit={postNewListing}>
            <h3 className="form-title">New Listing Form</h3>
            <h5 className="text-center">{errors.user}</h5>
            <div>
              <TextField
                id="outlined-based"
                label="Title"
                margin="normal"
                variant="filled"
                type="text"
                name="title"
                className={classes.textField}
                value={newListing.title}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <TextField
                id="outlined-based"
                label="Description"
                multiline
                margin="normal"
                variant="filled"
                type="text"
                name="description"
                className={classes.textField}
                value={newListing.description}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <TextField
                id="outlined-based"
                label="Postal Code"
                margin="normal"
                variant="filled"
                type="text"
                name="postal_code"
                className={classes.textField}
                value={newListing.postalCode}
                onChange={handleInputChange}
              />
            </div>

            <label className="small-12 columns">
              Select photo:
              <input type="file" name="photo" ref={fileInput} />
            </label>

            <div className="row">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Add Listing
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={clearForm}
              >
                Clear
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewListingContainer;
