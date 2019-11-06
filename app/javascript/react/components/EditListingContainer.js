import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  buttonMargin: {
    marginRight: ".5rem"
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
  },
  floatRightButton: {
    float: "right",
    marginTop: "1rem"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  }
}));

const EditListingContainer = props => {
  let classes = useStyles();
  let history = useHistory();
  const [errors, setErrors] = useState({});
  const [editListing, setEditListing] = useState({});
  const [listing, setListing] = useState({});

  let listingId = Number(window.location.pathname.split("/")[2]);

  useEffect(() => {
    fetch(`/api/v1/listings/${listingId}`, {
      credentials: "same-origin"
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        setEditListing({
          title: body.listing.title,
          description: body.listing.description,
          postal_code: body.listing.postal_code
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, []);

  const postEditListing = event => {
    event.preventDefault();
    fetch(`/api/v1/listings/${listingId}`, {
      credentials: "same-origin",
      method: "PATCH",
      body: JSON.stringify(editListing),
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
          history.push(`/listings/${body.id}`);
        } else {
          setErrors(body);
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  };

  const handleInputChange = event => {
    setEditListing({
      ...editListing,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  const cancelButtonToListings = event => {
    history.push(`/listings`);
  };

  return (
    <div>
      <form
        className={classes.container}
        onSubmit={postEditListing}
        autoComplete="off"
      >
        <div className="row">
          <div className="columns small-12">
            <h4 className={classes.topRow}>Edit Listing Form</h4>
            <h5 className="text-center">{errors.user}</h5>
            <label>
              Title: {errors.title}
              <input
                type="text"
                name="title"
                value={editListing.title}
                onChange={handleInputChange}
                className={classes.fullWidthTextInput}
              />
            </label>
          </div>
        </div>

        <div className="row">
          <div className="columns small-12">
            <label>
              Description: {errors.description}
              <input
                type="text"
                name="description"
                value={editListing.description}
                onChange={handleInputChange}
                className={classes.fullWidthTextInput}
              />
            </label>
          </div>
        </div>

        <div className="row">
          <div className="columns small-12">
            <label>
              Postal Code: {errors.postal_code}
              <input
                type="text"
                name="postal_code"
                value={editListing.postal_code}
                onChange={handleInputChange}
                className={classes.fullWidthTextInput}
              />
            </label>
          </div>
        </div>

        <div className={classes.floatRightButton}>
          <div className="row">
            <div className="columns small-12">
              <Button
                onClick={cancelButtonToListings}
                className={classes.buttonMargin}
              >
                Cancel
              </Button>

              <Button variant="contained" color="primary" type="submit">
                Update Listing
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditListingContainer;
