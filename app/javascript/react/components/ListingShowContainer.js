import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import EditListingContainer from "./EditListingContainer";

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

const ListingShowContainer = props => {
  let classes = useStyles();
  let history = useHistory();
  const [listing, setListing] = useState({});

  let listingId = props.match.params.id;

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

  return (
    <div>
      <div className="columns small-12 medium-6 show-block">
        <h3>{listing.title}</h3>
        <p>{listing.description}</p>
        <p>Postal Code: {listing.postal_code}</p>
        <Box width="50%" p={0.5} my={0.5}>
          <img src={listing.photo} />
        </Box>
      </div>

      <div className="columns small-12 medium-6 list-block">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          onClick={attemptStartConversation}
        >
          Questions about this listing? Ask here!
        </Button>
        <div>
          <EditListingContainer
            id={listingId}
            title={listing.title}
            description={listing.description}
            postalCode={listing.postal_code}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingShowContainer;
