import React from "react";
import { render } from "@testing-library/react";
import PropertyListItem from "./PropertyListItem";

describe("PropertyListItem", (): void => {
  it("renders without crashing", (): void => {
    render(<PropertyListItem />);
  });
});
