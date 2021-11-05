import * as action from "../constants/controlPanelContants";
export const setCopiedElements = (nodes) => ({
  type: action.SET_COPIED_ELEMENTS,
  payload: nodes
});
export const setActiveProject = (project) => ({
  type: action.SET_ACTIVE_PROJECT,
  payload: project,
});