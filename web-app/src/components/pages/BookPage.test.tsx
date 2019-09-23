import React from "react";
import { render } from "@testing-library/react";
import TestAppContextProvider from "../context/TestAppContextProvider";
import BookPage from "./BookPage";
import { MemoryRouter, Route } from "react-router";

describe("BookPage", (): void => {
  it("renders without crashing", (): void => {
    render(
      <TestAppContextProvider>
        <MemoryRouter
          initialEntries={[
            {
              pathname: "/book",
              state: {
                property: {
                  id: "hotelbeach",
                  name: "Hotel at the beach",
                  location: "Somestreet 42\n12345 Anywhere",
                  distance: 12,
                },
              },
            },
          ]}
        >
          <Route render={props => <BookPage {...props} />} />
        </MemoryRouter>
      </TestAppContextProvider>,
    );
  });

  it("renders without crashing without state", (): void => {
    render(
      <TestAppContextProvider>
        <MemoryRouter
          initialEntries={[
            {
              pathname: "/book",
            },
          ]}
        >
          <Route render={props => <BookPage {...props} />} />
        </MemoryRouter>
      </TestAppContextProvider>,
    );
  });
});
