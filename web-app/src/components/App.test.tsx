import React from "react";
import App from "./App";
import { render } from "@testing-library/react";

describe("App", (): void => {
  it("renders without crashing", (): void => {
    render(<App />);
  });
});
