import React from "react";
import { render } from "@testing-library/react";
import Page from "./Page";
import TestAppContextProvider from "./context/TestAppContextProvider";

describe("Page", (): void => {
  it("renders without crashing", (): void => {
    render(
      <TestAppContextProvider>
        <Page />
      </TestAppContextProvider>,
    );
  });
});
