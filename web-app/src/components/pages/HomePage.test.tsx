import React from "react";
import { render } from "@testing-library/react";
import HomePage from "./HomePage";
import TestAppContextProvider from "../context/TestAppContextProvider";

describe("HomePage", (): void => {
  it("renders without crashing", (): void => {
    render(
      <TestAppContextProvider>
        <HomePage />
      </TestAppContextProvider>,
    );
  });
});
