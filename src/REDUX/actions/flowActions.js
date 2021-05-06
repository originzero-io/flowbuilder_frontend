import * as action from "../constants/flowConstants";

export const setElements = (data) => ({
  type: action.SET_ELEMENTS,
  payload: data
});
export const setRotateAll = (data) => ({
  type: action.SET_ROTATE_ALL,
  payload: data
});
export const setExpandAll = (data) => ({
  type: action.SET_EXPAND_ALL,
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
export const rotateNode = (self,path) => ({
  type: action.ROTATE_NODE,
  payload: {self,path}
});
export const rotateMultiNode = (selectedIDArray,path) => ({
  type: action.ROTATE_MULTI_NODE,
  payload: {selectedIDArray,path}
});
export const expandNode = (self) => ({
  type: action.EXPAND_NODE,
  payload: {self}
});


