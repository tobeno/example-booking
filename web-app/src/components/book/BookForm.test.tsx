import React from "react";
import { render } from "@testing-library/react";
import TestAppContextProvider from "../context/TestAppContextProvider";
import { MemoryRouter } from "react-router";
import BookForm from "./BookForm";

describe("BookForm", (): void => {
  it("renders without crashing", (): void => {
    render(
      <TestAppContextProvider>
        <MemoryRouter>
          <BookForm
            property={{
              id: "hotelbeach",
              name: "Hotel at the beach",
              location: "Somestreet 42\n12345 Anywhere",
              distance: 12,
            }}
          />
        </MemoryRouter>
      </TestAppContextProvider>,
    );
  });
});
