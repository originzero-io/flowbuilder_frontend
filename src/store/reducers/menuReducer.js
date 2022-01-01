import * as actionTypes from "../constants/menuConstants";

const initialState = {
    state: false,
    x: 0,
    y: 0,
    element:{}
}
const menuConfig = {
  panelMenu: initialState,
  multiSelectionMenu: initialState,
  elementMenu: initialState,
  groupMenu: initialState,
}

const menuReducer = (state=menuConfig, action) => {
  switch (action.type) {
    case actionTypes.SET_PANEL_CONTEXT:
      return {...state,panelMenu:action.payload}
    case actionTypes.SET_MULTISELECTION_CONTEXT:
      return {...state,multiSelectionMenu:action.payload}
    case actionTypes.SET_ELEMENT_CONTEXT:
      return {...state,elementMenu:action.payload}
    case actionTypes.SET_OPEN_GROUP_PANEL:
      return {...state,groupMenu:action.payload}
    default:
      return state;
  }
}

export default menuReducer;

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
export const setGroupMenu = (data) => ({
  type: actionTypes.SET_OPEN_GROUP_PANEL,
  payload: data,
});