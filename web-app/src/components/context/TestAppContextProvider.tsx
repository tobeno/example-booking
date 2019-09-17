import * as React from "react";
import { createMuiTheme } from "@material-ui/core";
import ApiClient from "../../clients/ApiClient";
import AppContextProvider from "./AppContextProvider";

const testTheme = createMuiTheme({});
const testApiClient = new ApiClient("http://example.com");

/**
 * This provider initializes all global context providers and can be used in tests
 */
const TestAppContextProvider: React.FC = ({ children }) => {
  return (
    <AppContextProvider apiClient={testApiClient} theme={testTheme}>
      {children}
    </AppContextProvider>
  );
};

export default TestAppContextProvider;
