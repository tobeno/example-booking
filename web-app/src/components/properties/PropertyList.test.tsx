import React from "react";
import { render } from "@testing-library/react";
import PropertyList from "./PropertyList";

describe("PropertyList", (): void => {
  it("renders without crashing", (): void => {
    render(<PropertyList items={[]} />);
  });
});
