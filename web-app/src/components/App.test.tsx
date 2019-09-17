import React from "react";
import App from "./App";
import { render } from "@testing-library/react";
import TestAppContextProvider from "./context/TestAppContextProvider";

describe("App", (): void => {
  it("renders without crashing", (): void => {
    render(
      <TestAppContextProvider>
        <App />
      </TestAppContextProvider>,
    );
  });
});
