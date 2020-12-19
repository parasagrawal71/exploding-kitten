import React from "react";
import { Router } from "react-router-dom";

// IMPORT USER-DEFINED COMPONENTS HERE //
import history from "../../routes/history";
import Routes from "../../routes/Routes";

const App = () => {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
};

export default App;
