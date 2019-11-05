import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ChatIcon from "@material-ui/icons/Chat";
import EditIcon from "@material-ui/icons/Edit";

import EditListingContainer from "./EditListingContainer";

const useStyles = makeStyles(theme => ({
  button: {
    float: "right"
  },
  input: {
    display: "none"
  },
  buttonIcon: {
    marginRight: ".5rem"
  },
  container: {
    marginLeft: "15%",
    marginRight: "15%",
    marginTop: "1rem"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },

  maxHeight: {
    maxHeight: "400px"
  }
}));

const ListingShowContainer = props => {
  let classes = useStyles();
  let history = useHistory();
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
        setListing(body.listing);
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, []);

  const attemptStartConversation = async event => {
    // get the current user id, then navigate to the chat handleInputChange
    let userId = null;
    await fetch("/auth/is_signed_in")
      .then(response => response.json())
      .then(body => {
        console.log(body);
        if (body.signed_in) {
          userId = body.user.id;
        }
      });

    if (userId) {
      // the first user Id is mine, the second is the id coming from the listing itself (the author of the listing) and will always be the author of the listing because every listing must have a user.
      history.push(`/chats/${userId}/${listing.user_id}`);
    } else {
      history.push("/signup");
    }
  };

  const onEditListing = event => {
    history.push(`/listings/${listingId}/edit`);
  };

  let actionButton = "";
  if (props.user && props.user.id === listing.user_id) {
    actionButton = (
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}
        onClick={onEditListing}
      >
        <EditIcon className={classes.buttonIcon} />
        Edit Listing
      </Button>
    );
  } else if (props.user && props.user.id !== listing.user_id) {
    actionButton = (
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}
        onClick={attemptStartConversation}
      >
        <ChatIcon className={classes.buttonIcon} />
        Chat with owner
      </Button>
    );
  }

  return (
    <div className={classes.container}>
      <div className="row">
        <div className="columns small-6">
          <h3>{listing.title}</h3>
        </div>

        <div className="columns small-6">{actionButton}</div>
      </div>

      <div className="row">
        <div className="columns small-6">
          <p>Postal Code: {listing.postal_code}</p>
        </div>
      </div>

      <div className="row">
        <div className="columns small-12">
          <Box width="50%" p={0.5} my={0.5}>
            <img className={classes.maxHeight} src={listing.photo} />
          </Box>
        </div>
      </div>

      <div className="row">
        <div className="columns small-12">
          <p>{listing.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ListingShowContainer;
