import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import Header from "./Header";
import theme from "../theme";
import Page from "./Page";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Page />
    </ThemeProvider>
  );
};

export default App;
