import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { isEmpty } from "lodash";

import ListingIndexContainer from "./ListingIndexContainer";

const NewListingContainer = props => {
  const fileInput = useRef();
  const [shouldRedirect, setShouldRedirect] = useState(false);
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

  const postNewListing = () => {
    event.preventDefault();

    let formData = new FormData();
    [...fileInput.current.files].map((file, index) => {
      formData.append(`file${index}`, file);
    });

    formData.append("json", JSON.stringify(newListing));

    if (validForSubmission()) {
      fetch("/api/v1/listings", {
        credentials: "same-origin",
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
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
            setShouldRedirect(true);
          } else {
            setErrors(body);
          }
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  };

  if (shouldRedirect) {
    return <Redirect to="/listings" />;
  }

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
            <h3 className="text-center form-title">New Listing Form</h3>
            <h5 className="text-center">{errors.user}</h5>
            <label className="small-12 columns">
              Name: {errors.title}
              <input
                type="text"
                name="title"
                value={newListing.title}
                onChange={handleInputChange}
              />
            </label>

            <label className="small-12 columns">
              Description: {errors.description}
              <input
                type="text"
                name="description"
                value={newListing.description}
                onChange={handleInputChange}
              />
            </label>

            <label className="small-12 medium-6 large-4 columns">
              Postal Code: {errors.postal_code}
              <input
                type="text"
                name="postal_code"
                value={newListing.postal_code}
                onChange={handleInputChange}
              />
            </label>

            <label className="small-12 columns">
              Select photos:
              <input
                type="file"
                multiple
                name="listing_photos"
                value={newListing.listing_photos}
                ref={fileInput}
              />
            </label>

            <div className="text-center">
              <input className="button" type="submit" value="Add Listing" />
              <button className="button" onClick={clearForm}>
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewListingContainer;
