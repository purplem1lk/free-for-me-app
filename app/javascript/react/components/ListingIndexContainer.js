import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";

import EditListingContainer from "./EditListingContainer";
import ListingTile from "./ListingTile";

const useStyles = makeStyles(theme => ({
  fab: {
    position: "fixed",
    right: "2rem",
    bottom: "2rem",
    zIndex: 999
  },
  fabLink: {
    marginTop: "4px",
    "&:hover": {
      color: "inherit"
    }
  }
}));

const ListingIndexContainer = props => {
  const classes = useStyles();
  const [listings, setListings] = useState([]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    fetch("/api/v1/listings", {
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
        setListings(body.listings);
        setShowButton(body.user);
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }, []);

  const listingTiles = listings.map(listing => {
    return (
      <ListingTile
        key={listing.id}
        id={listing.id}
        title={listing.title}
        description={listing.description}
        postalCode={listing.postal_code}
        photo={listing.photo}
      />
    );
  });

  let button = "";
  if (showButton) {
    button = (
      <Tooltip title="Add Listing">
        <Fab color="primary" aria-label="add" className={classes.fab}>
          <Typography variant="body2">
            <Link
              href="/listings/new"
              className={classes.fabLink}
              color="inherit"
            >
              <AddIcon />
            </Link>
          </Typography>
        </Fab>
      </Tooltip>
    );
  }

  return (
    <div className="index-background">
      <div className="index-page">
        <p className="index-title row text-center">
          Free-cycle Listings in Boston
        </p>
        <hr />
        {button}
        <div className="row">{listingTiles}</div>
      </div>
    </div>
  );
};

export default ListingIndexContainer;
