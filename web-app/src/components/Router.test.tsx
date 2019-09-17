import React from "react";
import { render } from "@testing-library/react";
import Router from "./Router";
import { MemoryRouter } from "react-router";
import TestAppContextProvider from "./context/TestAppContextProvider";

describe("Router", (): void => {
  it("renders without crashing", (): void => {
    render(
      <TestAppContextProvider>
        <MemoryRouter>
          <Router />
        </MemoryRouter>
      </TestAppContextProvider>,
    );
  });
});
