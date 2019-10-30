import React, { useState, useEffect } from "react";

const ListingShowContainer = props => {
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

  return (
    <div>
      <h3>{listing.title}</h3>
      <p>{listing.description}</p>
    </div>
  );
};

export default ListingShowContainer;
