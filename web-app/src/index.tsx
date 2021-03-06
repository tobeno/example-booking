import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppContextProvider from "./components/context/AppContextProvider";
import App from "./components/App";
import { apiClient } from "./services";
import theme from "./theme";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <AppContextProvider apiClient={apiClient} theme={theme}>
    <App />
  </AppContextProvider>,
  document.getElementById("root"),
);

serviceWorker.register();
