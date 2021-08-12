import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import {AppWrapper} from "./components/style-components/AppWrapper";
import FlowPage from "./pages/FlowPage";
import ControlPanelPage from "./pages/ControlPanelPage";
import PrivateRoute from "./navigation/PrivateRoute";
import TabRedirector from './navigation/TabRedirector';
import NotFound from './navigation/NotFound';
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import * as routes from './navigation/RouterConfig';
const App = () => {
  return (
      <AppWrapper>
        <Switch>
          <Route exact path={routes.LOGIN} component={LoginPage}/>
          <PrivateRoute exact path={routes.PANEL} component={ControlPanelPage}/>
          <PrivateRoute exact path={routes.GOTO_FLOW} component={FlowPage}/>
          <PrivateRoute exact path={routes.GOTO_DASHBOARD} component={DashboardPage}/>
          <PrivateRoute exact path={routes.CHANGE_TAB} component={TabRedirector}/>
          {/* <Route path="*"><Redirect to={routes.LOGIN}/></Route> */}
          <Route path="*" component={NotFound}/>
        </Switch> 
        <NotificationContainer />
      </AppWrapper>
  );
};
export default App;
