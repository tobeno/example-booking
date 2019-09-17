import React from "react";
import { render } from "@testing-library/react";
import HomePage from "./HomePage";

describe("HomePage", (): void => {
  it("renders without crashing", (): void => {
    render(<HomePage />);
  });
});
