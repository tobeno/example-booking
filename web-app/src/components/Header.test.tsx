import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";

describe("Header", (): void => {
  it("renders without crashing", (): void => {
    render(<Header />);
  });
});
