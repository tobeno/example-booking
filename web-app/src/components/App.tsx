import React from "react";
import "./App.css";
import Router from "./Router";

const App: React.FC = () => {
  return (
    <>
      <div className="App__content">
        <Router />
      </div>
    </>
  );
};

export default App;
