import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import InitialFetchs from "app/InitialFetchs.jsx";
import Modal from "../components/Shared/Modal/Modal.jsx";
import SocketConnections from "./SocketConnections";
import * as Styled from "./App.style";
import NotFound from "../routes/NotFound";
import PrivateRoute from "../routes/PrivateRoute";
import AuthPage from "../pages/AuthPage";
import ControlPanelPage from "../pages/ControlPanelPage";
import DashboardPage from "../pages/DashboardPage";
import FlowPage from "../pages/FlowPage";
import LoadingBar from "../components/Shared/LoadingBar/LoadingBar.jsx";
import ToastNotification from "../components/Shared/Notification/ToastNotification.jsx";

const App = () => (
  <Styled.AppWrapper>
    <LoadingBar />
    <Switch>
      <Route exact path="/" component={AuthPage} />
      <PrivateRoute path="/panel" component={ControlPanelPage} />
      <PrivateRoute exact path="/flow/:flowId" component={FlowPage} />
      <PrivateRoute
        exact
        path="/dashboard/:dashboardId"
        component={DashboardPage}
      />
      <Route path="*" component={NotFound} />
    </Switch>
    <ToastNotification />
    <Modal />
    <SocketConnections />
    <InitialFetchs />
  </Styled.AppWrapper>
);

export default App;
