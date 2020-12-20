import React from "react";
import { Switch } from "react-router-dom";

// IMPORT ALL PAGES HERE //
import landingPage from "../pages/landingPage/LandingPage";
import Home from "../pages/home/Home";
import Leaderboard from "../pages/leaderboard/Leaderboard";
import Rules from "../pages/rules/Rules";

// IMPORT OTHERS HERE //
import Route from "./RouteWrapper";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={landingPage} />
      <Route path="/home" exact component={Home} isPrivate />
      <Route path="/leaderboard" exact component={Leaderboard} isPrivate />
      <Route path="/rules" exact component={Rules} isPrivate />
      <Route component={landingPage} />
    </Switch>
  );
};

export default Routes;
