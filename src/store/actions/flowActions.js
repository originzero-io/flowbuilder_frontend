import { createFlowService, deleteFlowService, editFlowConfigService, getFlowsByProjectService, getFlowsByWorkspaceService , moveFlowService } from "../../services/flowService";
import * as action from "../constants/flowConstants";

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

export const setCurrentFlowConfig = (data) => ({
  type: action.SET_CURRENT_FLOW_CONFIG,
  payload: data
});
export const setCurrentFlowGui = (data) => ({
  type: action.SET_CURRENT_FLOW_GUI,
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



export const getFlowsByWorkspace = (workspace) => async dispatch => {
  const { flows } = await getFlowsByWorkspaceService(workspace);
  console.log("flows:", flows);
  if (workspace) {
    dispatch( {
      type: action.LOAD_FLOWS,
      payload: flows,
    });
  }
  else {
    dispatch( {
      type: action.LOAD_FLOWS,
      payload: [],
    });
  }
}
export const getFlowsByProject = (project) => async dispatch => {
  const { flows } = await getFlowsByProjectService(project);
  console.log("FLOWS:", flows);
  dispatch( {
    type: action.LOAD_FLOWS,
    payload: flows,
  });
}
export const createFlow = (params) => async dispatch => {
  const { flow } = await createFlowService(params);
  dispatch({
    type: action.CREATE_FLOW,
    payload: flow,
  })
};
export const editFlow = (currentConfig,newConfig) => async dispatch => {
  const { flow } = await editFlowConfigService(currentConfig._id, newConfig);
  dispatch({
    type: action.UPDATE_FLOW,
    payload: flow,
  })
};
export const moveFlow = (currentConfig,newConfig) => async dispatch => {
  const { flow } = await moveFlowService(currentConfig._id, newConfig);
  dispatch({
    type: action.UPDATE_FLOW,
    payload: flow,
  })
};
export const deleteFlow = (flow) => async dispatch => {
  await deleteFlowService(flow._id);
  dispatch({
    type: action.DELETE_FLOW,
    payload: flow,
  })
};





