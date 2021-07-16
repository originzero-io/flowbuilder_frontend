import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import {AppWrapper} from "./components/style-components/AppWrapper";
import FlowPage from "./pages/FlowPage";
import ControlPanel from "./pages/ControlPanelPage";
import FlowTabs from "./components/global/FlowTabs";
import PrivateRoute from "./components/global/PrivateRoute";
import TabChange from "./pages/TabChange";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import LoginPageX from "./pages/LoginPageX";
import { init,sendMessage,subscribeChat,disconnect } from './services/socketApi';
const App = () => {
  useEffect(() => {
    init();
    subscribeChat(message => {
      alert(message.message);
    });
    return () => {
      disconnect();
    }
  }, [])
  return (
    <AppWrapper>
      <Switch>
        <Route exact path="/login" component={LoginPage}/>
        <PrivateRoute exact path="/panel" component={ControlPanel}/>
        <PrivateRoute exact path="/flow/:flowId" component={FlowPage}/>
        <PrivateRoute exact path="/change-tab/:flowId" component={TabChange}/>
        <PrivateRoute exact path="/dashboard/:dashboardId" component={DashboardPage}/>
        <Route path="*"><Redirect to="/login"/></Route>  
      </Switch>
      
      <NotificationContainer />
    </AppWrapper>
  );
};
export default App;
