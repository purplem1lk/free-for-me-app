import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const EditListingContainer = props => {
  let history = useHistory();
  const [errors, setErrors] = useState({});
  const [editListing, setEditListing] = useState({});

  useEffect(() => {
    setEditListing({
      title: props.title,
      description: props.description,
      postal_code: props.postalCode
    });
  }, [props]);

  const postEditListing = event => {
    event.preventDefault();
    fetch(`/api/v1/listings/${props.id}`, {
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
          history.push("/listings");
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

  return (
    <div>
      <form className="small-12 columns" onSubmit={postEditListing}>
        <h4 className="text-center">Edit Listing Form</h4>
        <h5 className="text-center">{errors.user}</h5>
        <label>
          Title: {errors.title}
          <input
            type="text"
            name="title"
            value={editListing.title}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Description: {errors.description}
          <input
            type="text"
            name="description"
            value={editListing.description}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Postal Code: {errors.postal_code}
          <input
            type="text"
            name="postal_code"
            value={editListing.postal_code}
            onChange={handleInputChange}
          />
        </label>

        <div>
          <input className="button" type="submit" value="Update Listing" />
        </div>
      </form>
      <div className="cancel-button">
        <button className="button" onClick={props.resetPageFromCancel}>
          Cancel
        </button>
      </div>
      <hr />
    </div>
  );
};

export default EditListingContainer;
