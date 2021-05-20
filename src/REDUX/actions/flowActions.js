import * as action from "../constants/flowConstants";
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
export const setGroupBarDisplay = (data) => ({
  type: action.SET_GROUPBAR_DISPLAY,
  payload: data
});
export const setZoom = (data) => ({
  type: action.SET_ZOOM,
  payload: data
});
export const setRotateAllPath = (data) => ({
  type: action.SET_ROTATE_ALL_PATH,
  payload: data
});
export const setEdgeType = (data) => ({
  type: action.SET_EDGE_TYPE,
  payload: data
});
export const setCopiedElements = (nodes) => ({
  type: action.SET_COPIED_ELEMENTS,
  payload: nodes
});



