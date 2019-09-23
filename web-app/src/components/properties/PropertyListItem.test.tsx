import React from "react";
import { render } from "@testing-library/react";
import PropertyListItem from "./PropertyListItem";
import { MemoryRouter } from "react-router";

describe("PropertyListItem", (): void => {
  it("renders without crashing", (): void => {
    render(
      <MemoryRouter>
        <PropertyListItem
          item={{
            id: "hotelbeach",
            name: "Hotel at the beach",
            location: "Somestreet 42\n12345 Anywhere",
            distance: 12,
          }}
        />
      </MemoryRouter>,
    );
  });

  it("renders without crashing without distance", (): void => {
    render(
      <MemoryRouter>
        <PropertyListItem
          item={{
            id: "hotelbeach",
            name: "Hotel at the beach",
            location: "Somestreet 42\n12345 Anywhere",
          }}
        />
      </MemoryRouter>,
    );
  });
});
