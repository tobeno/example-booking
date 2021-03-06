import "date-fns";
import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import ApiClientContext from "./ApiClientContext";
import ApiClient from "../../clients/ApiClient";
import { Theme } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

type Props = {
  apiClient: ApiClient;
  theme: Theme;
};

/**
 * Provider for global context like the API client and the UI theme
 */
const AppContextProvider: React.FC<Props> = ({
  children,
  apiClient,
  theme,
}) => {
  return (
    <ApiClientContext.Provider value={apiClient}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {children}
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </ApiClientContext.Provider>
  );
};

export default AppContextProvider;
