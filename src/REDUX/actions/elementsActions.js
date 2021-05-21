import * as action from "../constants/elementsContants";
export const setElements = (data) => ({
  type: action.SET_ELEMENTS,
  payload: data,
});
export const addNewNode = (node) => ({
  type: action.ADD_NEW_NODE,
  payload: node,
});
export const pasteNodes = (nodes) => ({
  type: action.PASTE_NODES,
  payload: nodes,
});
export const setRotateAll = (data) => ({
  type: action.SET_ROTATE_ALL,
  payload: data,
});
export const setExpandAll = (data) => ({
  type: action.SET_EXPAND_ALL,
  payload: data,
});
export const rotateNode = (self, path) => ({
  type: action.ROTATE_NODE,
  payload: { self, path },
});
export const rotateMultiNode = (selectedIDArray, path) => ({
  type: action.ROTATE_MULTI_NODE,
  payload: { selectedIDArray, path },
});
export const expandNode = (self) => ({
  type: action.EXPAND_NODE,
  payload: { self },
});
export const changeNodeName = (self, editedName) => ({
  type: action.CHANGE_NODE_NAME,
  payload: { self, editedName },
});
export const setNodeEnable = (self, checked) => ({
  type: action.SET_NODE_ENABLE,
  payload: { self, checked },
});
export const setMultipleNodeEnable = (selectedIDArray) => ({
  type: action.SET_NODE_ENABLE_MULTIPLE,
  payload: { selectedIDArray },
});
export const setOutgoersEnable = (outgouersIdArray, enable) => ({
  type: action.SET_OUTGOERS_ENABLE,
  payload: { outgouersIdArray, enable },
});
export const importElements = (data) => ({
  type: action.IMPORT_ELEMENTS,
  payload: data,
});
export const changeEdgeType = (data) => ({
  type: action.CHANGE_EDGE_TYPE,
  payload: data,
});
export const setAllNodesDeselect = () => ({
  type: action.SET_ALL_NODES_DESELECT,
});