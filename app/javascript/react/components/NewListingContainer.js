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

  const postNewListing = async () => {
    event.preventDefault();

    // uploadURL will save the uploaded photo as a URL, if they have one.
    let uploadUrl = "";
    if (fileInput.current.files[0]) {
      const responsePayload = await fetch("/s3/direct_post").then(response =>
        response.json()
      );

      // there's a property in the response from S3 called URL, so we are only calling URL below:
      const url = responsePayload.url;
      const formData = new FormData();
      // This is a recipe for an object that we want to put all the properties inside of formdata
      Object.keys(responsePayload.fields).forEach(key => {
        formData.append(key, responsePayload.fields[key]);
      });
      // must be responsePayload.fields[key] so it knows which key to look at.

      formData.append("file", fileInput.current.files[0]);
      //  "file" above must be in quotes since it is the name of the key.) fileInput.current.files[0] is still the blob, not yet the string.

      // the url in the fetch is the url that S3 told us to upload it
      const xmlResponse = await fetch(url, {
        method: "POST",
        body: formData
      }).then(response => response.text());
      // because this is XML and not JSON, we want response.text(), not response.JSON()
      // in the response that S3 sends back, it gives us a <Location>, which is where the image got uploaded to. We need to get this value in order to save it to our database. response.text() converts XML to a string.

      // a DOMParser class provides the ability to parse XML or HTML source code from a string
      uploadUrl = new DOMParser()
        .parseFromString(xmlResponse, "application/xml")
        // above is where we actually give the xmlResponse and telling it the content-type: "application/xml". the content-type is required so DOMParser knows what to parse.
        .getElementsByTagName("Location")[0].textContent;
      // we'll get the value of the tagname Location, textContent is the stuff inside of the tags. We need to add [0], regardless how many photos we were uploading.
    }

    // this is what we send to our Rails API
    let payload = {
      title: newListing.title,
      description: newListing.description,
      postal_code: newListing.postal_code
    };

    // if uploadUrl is truthy, then the payload.photo is now the uploadUrl
    if (uploadUrl) {
      payload.photo = uploadUrl;
    }

    //  *** IN CORS CONFIG IN AWS, MUST COPY CORS CONFIG FROM DEV TO PRODUCTION SO PICS CAN UPLOAD IN HEROKU

    if (validForSubmission()) {
      fetch("/api/v1/listings", {
        credentials: "same-origin",
        method: "POST",
        body: JSON.stringify(payload),
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
              Select photo:
              <input type="file" name="photo" ref={fileInput} />
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
