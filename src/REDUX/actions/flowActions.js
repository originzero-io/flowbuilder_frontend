import * as action from "../constants/flowConstants";

export const setElements = (data) => ({
  type: action.SET_ELEMENTS,
  payload: data
});
export const setReactFlowInstance = (data) => ({
  type: action.SET_REACT_FLOW_INSTANCE,
  payload: data
});
export const setClickedElement = (data) => ({
  type: action.SET_CLICKED_ELEMENT,
  payload: data
});
export const setMiniMapDisplay = (data) => ({
  type: action.SET_MINIMAP_DISPLAY,
  payload: data
});
