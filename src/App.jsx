import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import logo from "./assets/images/logo.png";
import {AppWrapper} from "./components/style-components/AppWrapper";
import Favicon from "react-favicon";
import FlowPage from "./pages/FlowPage";
import ControlPanel from "./pages/ControlPanelPage";
const App = () => {
  return (
    <AppWrapper>
      <Switch>
        <Route exact path="/" component={ControlPanel}/>
        <Route exact path="/flow/:flowId" component={FlowPage}/>
        <Route exact path="/dashbord/:dashboardId" component={FlowPage}/>
        <Route><Redirect to="/"/></Route>  
      </Switch>
      <NotificationContainer />
      {/* <Favicon url={logo} /> */}
    </AppWrapper>
  );
};
export default App;
