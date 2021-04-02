import * as actionTypes from "../constants/menuConstants"
export const setPanelContextMenu = (data) => ({
  type: actionTypes.SET_PANEL_CONTEXT,
  payload: data,
});
export const setElementContextMenu = (data) => ({
  type: actionTypes.SET_ELEMENT_CONTEXT,
  payload: data,
});
export const setMultiSelectionContextMenu = (data) => ({
  type: actionTypes.SET_MULTISELECTION_CONTEXT,
  payload: data,
});
