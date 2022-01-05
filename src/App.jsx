import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import { AppWrapper } from "./components/style-components/AppWrapper";
import FlowPage from "./pages/FlowPage";
import ControlPanelPage from "./pages/ControlPanelPage";
import PrivateRoute from "./navigation/PrivateRoute";
import TabRedirector from "./navigation/TabRedirector";
import NotFound from "./navigation/NotFound";
import DashboardPage from "./pages/DashboardPage";
import AuthPage from "./pages/AuthPage";
import Modal from "./components/global/Modal.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  saveElements,
  setElements,
} from "./store/reducers/flow/flowElementsReducer";
import createSocket, { elementSubscribe, flowSubscribe, projectSubscribe, workspaceSubscribe } from "./services/socketApi";
import {
  createFlow,
  deleteFlow,
  editFlow,
  moveFlow,
} from "./store/reducers/flow/flowReducer";
import { createProject, deleteProject, updateProject } from "./store/reducers/projectReducer";
import { createWorkspace, deleteWorkspace, editWorkspace } from "./store/reducers/workspaceReducer";
export const elementNamespace = createSocket("elements");
export const flowNamespace = createSocket("flows");
export const projectNamespace = createSocket("projects");
export const workspaceNamespace = createSocket("workspaces");
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    elementSubscribe(elementNamespace, dispatch);
    flowSubscribe(flowNamespace, dispatch);
    projectSubscribe(projectNamespace,dispatch);
    workspaceSubscribe(workspaceNamespace, dispatch);
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
