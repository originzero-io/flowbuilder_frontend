import * as action from "../constants/controlPanelContants";
export const setActivePanel = (panel) => ({
  type: action.SET_ACTIVE_PANEL,
  payload: panel,
});
export const setCopiedElements = (nodes) => ({
  type: action.SET_COPIED_ELEMENTS,
  payload: nodes
});
export const setActiveProject = (project) => ({
  type: action.SET_ACTIVE_PROJECT,
  payload: project,
});
export const addProject = (project) => ({
  type: action.ADD_PROJECT,
  payload: project,
});
export const deleteProject = (project) => ({
  type: action.DELETE_PROJECT,
  payload: project,
});
export const addDashboard = (dashboard) => ({
  type: action.ADD_DASHBOARD,
  payload: dashboard,
});
export const deleteDashboard = (dashboard) => ({
  type: action.DELETE_DASHBOARD,
  payload: dashboard,
});
