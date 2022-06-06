import * as actions from "../../constants/flowConstants";
const flowGuiReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actions.SET_CURRENT_FLOW_GUI:
      return payload;
    case actions.SET_PANE_CLICK_POSITION:
      return { ...state, paneClickPosition: payload };
    case actions.SET_REACT_FLOW_INSTANCE:
      return { ...state, reactFlowInstance: payload };
    case actions.SET_THEME:
      return { ...state, theme: payload };
    case actions.SET_MINIMAP_DISPLAY:
      return { ...state, miniMapDisplay: payload };
    case actions.SET_ROTATE_ALL_PATH:
      return { ...state, rotateAllPath: payload };
    case actions.SET_FLOW_EDGE_TYPE:
      return { ...state, edgeType: payload };
    case actions.SET_GROUPBAR_DISPLAY:
      return { ...state, groupBarDisplay: payload };
    case actions.SET_CLOSE_ALL_GROUPS:
      return { ...state, nodeGroupMenuDisplay: payload };
    default:
      return state;
  }
};

export default flowGuiReducer;

export const setCurrentFlowGui = (data) => ({
  type: actions.SET_CURRENT_FLOW_GUI,
  payload: data,
});
export const setReactFlowInstance = (reactFlowInstance) => ({
  type: actions.SET_REACT_FLOW_INSTANCE,
  payload: reactFlowInstance,
});
export const setMiniMapDisplay = (data) => ({
  type: actions.SET_MINIMAP_DISPLAY,
  payload: data,
});
export const setGroupBarDisplay = (data) => ({
  type: actions.SET_GROUPBAR_DISPLAY,
  payload: data,
});
export const setRotateAllPath = (data) => ({
  type: actions.SET_ROTATE_ALL_PATH,
  payload: data,
});
export const setFlowEdgeType = (data) => ({
  type: actions.SET_FLOW_EDGE_TYPE,
  payload: data,
});
export const setPaneClickPosition = (x, y) => ({
  type: actions.SET_PANE_CLICK_POSITION,
  payload: { x, y },
});
export const setTheme = (data) => ({
  type: actions.SET_THEME,
  payload: data,
});

export const closeAllNodeGroupMenu = (data) => ({
  type: actions.SET_CLOSE_ALL_GROUPS,
  payload: data,
});
