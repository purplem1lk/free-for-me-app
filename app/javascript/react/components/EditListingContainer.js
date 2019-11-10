import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
            <h3 className={classes.topRow}>Edit Listing Form</h3>
            <h5 className="text-center">{errors.user}</h5>
            <TextField
              InputLabelProps={{ shrink: true }}
              id="outlined-based"
              margin="normal"
              label="Title"
              variant="filled"
              type="text"
              name="title"
              value={editListing.title}
              onChange={handleInputChange}
              className={classes.fullWidthTextInput}
            />
          </div>
        </div>
        <div className="row">
          <div className="columns small-12">
            <TextField
              InputLabelProps={{ shrink: true }}
              id="outlined-based"
              margin="normal"
              label="Description"
              multiline
              variant="filled"
              type="text"
              name="description"
              value={editListing.description}
              onChange={handleInputChange}
              className={classes.fullWidthTextInput}
            />
          </div>
        </div>

        <div className="row">
          <div className="columns small-12">
            <TextField
              InputLabelProps={{ shrink: true }}
              id="outlined-based"
              margin="normal"
              label="Postal Code"
              variant="filled"
              type="text"
              name="postal_code"
              value={editListing.postal_code}
              onChange={handleInputChange}
              className={classes.fullWidthTextInput}
            />
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

              <Button
                variant="outlined"
                color="inherit"
                type="submit"
                className={classes.buttonMargin}
              >
                Delete Listing
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
