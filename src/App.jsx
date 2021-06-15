import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import {AppWrapper} from "./components/style-components/AppWrapper";
import FlowPage from "./pages/FlowPage";
import ControlPanel from "./pages/ControlPanelPage";
import FlowTabs from "./components/global/FlowTabs";
import TabChange from "./pages/TabChange";
import DashboardPage from "./pages/DashboardPage";
//import logo from "./assets/images/logo.png";
//import Favicon from "react-favicon";
const App = () => {
  return (
    <AppWrapper>
      <Switch>
        <Route exact path="/" component={ControlPanel}/>
        <Route exact path="/flow/:flowId" component={FlowPage}/>
        <Route exact path="/changeTab/:flowId" component={TabChange}/>
        <Route exact path="/dashboard/:dashboardId" component={DashboardPage}/>
        <Route><Redirect to="/"/></Route>  
      </Switch>
      <FlowTabs/>
      <NotificationContainer />
      {/* <Favicon url={logo} /> */}
    </AppWrapper>
  );
};
export default App;
