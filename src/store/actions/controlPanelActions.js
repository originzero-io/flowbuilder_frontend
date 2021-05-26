import * as action from "../constants/controlPanelContants";
export const setActivePanel = (panel) => ({
  type: action.SET_ACTIVE_PANEL,
  payload: panel,
});
export const addProject = (project) => ({
  type: action.ADD_PROJECT,
  payload: project,
});
export const setActiveProject = (project) => ({
  type: action.SET_ACTIVE_PROJECT,
  payload: project,
});
export const addNewFlowToProject = (project,flow) => ({
  type: action.ADD_NEW_FLOW_TO_PROJECT,
  payload: {project,flow},
});