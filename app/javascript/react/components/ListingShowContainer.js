import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import EditListingContainer from "./EditListingContainer";

const ListingShowContainer = props => {
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
      <h3>{listing.title}</h3>
      <p>{listing.description}</p>
      <img src={listing.photo} />
      <button className="button" onClick={attemptStartConversation}>
        Questions about this listing? Ask here!
      </button>
      <div className="columns small-12 medium-6 list-block">
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
