import React from "react";
import { Switch, Route } from "react-router";

import RequestTabPage from "./containers/RequestTabPage";

export default (
  <Switch>
    <Route exact path="/" component={RequestTabPage} />
  </Switch>
);
