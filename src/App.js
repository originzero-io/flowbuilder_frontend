import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import logo from "./assets/images/logo.png";
import {AppWrapper} from "./components/style-components/AppWrapper";
import AppTooltips from "./components/global/AppTooltips";
import Favicon from "react-favicon";
import HomePage from "./pages/home";
import FlowPage from "./pages/flow";
const App = () => {
  return (
    <AppWrapper>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/flow">
          <FlowPage/>
        </Route>
      </Switch>
      <NotificationContainer />
      <AppTooltips />
      <Favicon url={logo} />
    </AppWrapper>
  );
};
export default App;
