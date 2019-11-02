import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import EditListingContainer from "./EditListingContainer";
import ListingTile from "./ListingTile";

const ListingIndexContainer = props => {
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
        photo={listing.photo_urls}
      />
    );
  });

  let button = "";
  if (showButton) {
    button = (
      <Link to="/listings/new" className="button">
        Add New Listing
      </Link>
    );
  }

  return (
    <div className="index-background">
      <div className="index-page">
        <p className="index-title row text-center">
          Free-cycle Listings in Boston
        </p>
        <hr />
        <div className="text-center row float-right">{button}</div>
        <div className="row">{listingTiles}</div>
      </div>
    </div>
  );
};

export default ListingIndexContainer;
