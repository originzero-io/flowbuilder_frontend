import React from "react";
import { Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import logo from "./assets/images/logo.png";
import {AppWrapper} from "./components/style-components/AppWrapper";
import AppTooltips from "./components/global/AppTooltips";
import Favicon from "react-favicon";
import HomePage from "./pages/HomePage";
import FlowPage from "./pages/FlowPage";
import ControlPanel from "./pages/ControlPanelPage";
const App = () => {
  return (
    <AppWrapper>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/panel" component={ControlPanel}/>
        <Route exact path="/flow" component={FlowPage}/>
        <Route path="/flow/:flowId" component={FlowPage}/>
        <Route path="/dashbord/:dashboardId" component={FlowPage}/>
      </Switch>
      <NotificationContainer />
      <AppTooltips />
      <Favicon url={logo} />
    </AppWrapper>
  );
};
export default App;
