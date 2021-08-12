import * as action from "../constants/flowConstants";

export const setActiveFlow = (flowId) => ({
  type: action.SET_ACTIVE_FLOW,
  payload: flowId
});
export const setReactFlowInstance = (reactFlowInstance) => ({
  type: action.SET_REACT_FLOW_INSTANCE,
  payload: reactFlowInstance
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
export const setWorkspaceEdgeType = (data) => ({
  type: action.SET_WORKSPACE_EDGE_TYPE,
  payload: data
});
export const setPaneClickPosition = (x,y) => ({
  type: action.SET_PANE_CLICK_POSITION,
  payload: {x,y}
});
export const setTheme = (data) => ({
  type: action.SET_THEME,
  payload: data
});

export const closeAllNodeGroupMenu = (data) => ({
  type: action.SET_CLOSE_ALL_GROUPS,
  payload: data
});

export const addFlow = (flow) => ({
  type: action.ADD_FLOW,
  payload: flow,
});
export const deleteFlow = (flow) => ({
  type: action.DELETE_FLOW,
  payload: flow,
});
export const mergeFlow = (flow) => ({
  type: action.MERGE_FLOW,
  payload: flow,
});



export const setCurrentFlowConfig = (data) => ({
  type: action.SET_CURRENT_FLOW_CONFIG,
  payload: data
});
export const setCurrentFlowWorkspace = (data) => ({
  type: action.SET_CURRENT_FLOW_WORKSPACE,
  payload: data
});
export const openFlow = (flow) => ({
  type: action.OPEN_FLOW,
  payload: flow
});
export const closeFlow = (flow) => ({
  type: action.CLOSE_FLOW,
  payload: flow
});

export const loadFlows = (flows) => ({
  type: action.LOAD_FLOWS,
  payload: flows
});




