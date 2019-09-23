import { render } from "@testing-library/react";
import React from "react";
import ButtonLink from "./ButtonLink";
import { MemoryRouter } from "react-router";

describe("ButtonLink", (): void => {
  it("renders without crashing", (): void => {
    render(
      <MemoryRouter>
        <ButtonLink to="/">Click me</ButtonLink>
      </MemoryRouter>,
    );
  });
});
