import React from "react";
import { Switch } from "react-router-dom";

// IMPORT ALL PAGES HERE //
import landingPage from "../pages/landingPage/LandingPage";
import Home from "../pages/home/Home";

// IMPORT OTHERS HERE //
import Route from "./RouteWrapper";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={landingPage} />
      <Route path="/home" exact component={Home} />
      <Route component={landingPage} />
    </Switch>
  );
};

export default Routes;
