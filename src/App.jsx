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
import createSocket from "./services/socketApi";
import {
  createFlow,
  deleteFlow,
  editFlow,
  moveFlow,
} from "./store/reducers/flow/flowReducer";
import { createProject, deleteProject, updateProject } from "./store/reducers/projectReducer";
import { createWorkspace, deleteWorkspace, editWorkspace } from "./store/reducers/workspaceReducer";
//export const mainNamespace = createSocket("main");
export const elementNamespace = createSocket("elements");
export const flowNamespace = createSocket("flows", {
  auth: { token: 123 },
});
export const projectNamespace = createSocket("projects");
export const workspaceNamespace = createSocket("workspaces");
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    elementNamespace.on("elements:save", (data) => {
      dispatch(saveElements(data));
    });
    elementNamespace.on("elements:getElements", (data) => {
      dispatch(setElements(data.data));
    });
    elementNamespace.emit("elements:test", "message", (data) => {
      console.log("testten gelen:", data);
    });

    flowNamespace.on("flows:remove", (data) => {
      dispatch(deleteFlow(data.flow));
    });
    flowNamespace.on("flows:update", (data) => {
      dispatch(editFlow(data.flow));
    });
    flowNamespace.on("flows:move", (data) => {
      dispatch(moveFlow(data.flow));
    });
    flowNamespace.on("flows:create", (data) => {
      dispatch(createFlow(data.flow));
    });

    projectNamespace.on("projects:create", (data) => {
      dispatch(createProject(data.project));
    });
    projectNamespace.on("projects:update", (data) => {
      dispatch(updateProject(data.project));
    });
    projectNamespace.on("projects:remove", (data) => {
      dispatch(deleteProject(data.project));
    });

    workspaceNamespace.on("workspaces:create", (data) => {
      dispatch(createWorkspace(data.workspace));
    });
    workspaceNamespace.on("workspaces:update", (data) => {
      dispatch(editWorkspace(data.workspace));
    });
    workspaceNamespace.on("workspaces:remove", (data) => {
      dispatch(deleteWorkspace(data.workspace));
    });
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
