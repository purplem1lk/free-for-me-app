import React from "react";
import { BrowserRouter } from "react-router-dom";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import ListingTile from "./ListingTile";

describe("ListingTile", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <ListingTile
          key="3"
          id="3"
          title="New Yoga Mat"
          description="Looking to give away a new yoga mat I've had for years, but never used. Decluttering my apartment before I move soon. Please message me to arrange a pick-up!"
          postal_code="02111"
        />
      </BrowserRouter>
    );
  });

  it("renders an p tag with the listing title and postal code", () => {
    expect(wrapper.find("p").text()).toBe("New Yoga Mat, 02111");
  });
});
