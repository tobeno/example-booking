import React from "react";
import { render } from "@testing-library/react";
import Page from "./Page";

describe("Page", (): void => {
  it("renders without crashing", (): void => {
    render(<Page />);
  });
});
