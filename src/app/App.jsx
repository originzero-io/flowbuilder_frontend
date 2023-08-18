import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import InitialFetchs from "app/InitialFetchs";
import Modal from "../components/Shared/Modal/Modal.jsx";
import SocketConnections from "./SocketConnections.jsx";
import AppWrapper from "./App.style";
import NotFound from "../routes/NotFound.jsx";
import PrivateRoute from "../routes/PrivateRoute.jsx";
import AuthPage from "../pages/AuthPage.jsx";
import ControlPanelPage from "../pages/ControlPanelPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import FlowPage from "../pages/FlowPage.jsx";
import LoadingBar from "../components/Shared/LoadingBar/LoadingBar.jsx";
import ToastNotification from "../components/Shared/Notification/ToastNotification.jsx";

const App = () => (
  <AppWrapper>
    <LoadingBar />
    <Switch>
      <Route exact path="/" component={AuthPage} />
      <PrivateRoute path="/panel" component={ControlPanelPage} />
      <PrivateRoute exact path="/flow/:flowId/:port" component={FlowPage} />
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
  </AppWrapper>
);

export default App;
