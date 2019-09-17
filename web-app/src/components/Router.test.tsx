import React from "react";
import { render } from "@testing-library/react";
import Router from "./Router";
import { MemoryRouter } from "react-router";

describe("Router", (): void => {
  it("renders without crashing", (): void => {
    render(
      <MemoryRouter>
        <Router />
      </MemoryRouter>,
    );
  });
});
