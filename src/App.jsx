import React, { useEffect } from "react";
import { NotificationContainer } from "react-notifications";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Modal from "./components/global/Modal.jsx";
import { AppWrapper } from "./components/style-components/AppWrapper";
import NotFound from "./navigation/NotFound";
import PrivateRoute from "./navigation/PrivateRoute";
import TabRedirector from "./navigation/TabRedirector";
import AuthPage from "./pages/AuthPage";
import ControlPanelPage from "./pages/ControlPanelPage";
import DashboardPage from "./pages/DashboardPage";
import FlowPage from "./pages/FlowPage";
import createSocket, { elementSubscribe, flowSubscribe, projectSubscribe, workspaceSubscribe,noteSubscribe } from "./services/socketApi";
export const elementNamespace = createSocket("elements");
export const flowNamespace = createSocket("flows");
export const projectNamespace = createSocket("projects");
export const workspaceNamespace = createSocket("workspaces");
export const noteNamespace = createSocket("notes");
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    elementSubscribe(elementNamespace, dispatch);
    flowSubscribe(flowNamespace, dispatch);
    projectSubscribe(projectNamespace,dispatch);
    workspaceSubscribe(workspaceNamespace, dispatch);
    noteSubscribe(noteNamespace, dispatch);
  }, []);
  return (
    <AppWrapper>
      <Switch>
        <Route exact path="/" component={AuthPage} />
        <PrivateRoute path="/panel" component={ControlPanelPage} />
        <PrivateRoute exact path="/flow/:flowId" component={FlowPage} />
        <PrivateRoute
          exact
          path="/dashboard/:dashboardId"
          component={DashboardPage}
        />
        <PrivateRoute
          exact
          path="/change-tab/:flowId"
          component={TabRedirector}
        />
        <Route path="*" component={NotFound} />
      </Switch>
      <NotificationContainer />
      <Modal />
    </AppWrapper>
  );
};

export default App;
