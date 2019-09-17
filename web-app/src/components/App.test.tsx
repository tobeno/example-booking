import React from "react";
import App from "./App";
import { render } from "@testing-library/react";

describe("App", (): void => {
  it("renders without crashing", () => {
    const { queryByText } = render(<App />);

    expect(queryByText("Booking example")).toBeTruthy();
  });
});
