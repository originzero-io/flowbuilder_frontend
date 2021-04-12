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
  groupMenu: initialState
}

export const menuConfigReducer = (state=menuConfig, action) => {
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

