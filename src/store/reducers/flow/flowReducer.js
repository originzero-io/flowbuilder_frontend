import * as actions from "../../constants/flowConstants";
import { createFlowService, deleteFlowService, editFlowConfigService, getFlowsByProjectService, getFlowsByWorkspaceService , moveFlowService } from "../../../services/flowService";

export const flowReducer = (state = [], { type, payload }) => {
  switch (type) {
    case actions.CREATE_FLOW:
      return [...state, payload];
    case actions.DELETE_FLOW:
      return state.filter((state) => state._id !== payload._id);
    case actions.GET_FLOWS:
      return payload;
    case actions.UPDATE_FLOW:
      return state.map((state) => {
        if (state._id === payload._id) {
          return payload;
        } else return state;
      });
    default:
      return state;
  }
};

export default flowReducer;

export const getFlowsByWorkspace = (workspace) => async dispatch => {
  const { flows } = await getFlowsByWorkspaceService(workspace);
  if (workspace) {
    dispatch( {
      type: actions.GET_FLOWS,
      payload: flows,
    });
  }
  else {
    dispatch( {
      type: actions.GET_FLOWS,
      payload: [],
    });
  }
}
export const getFlowsByProject = (project) => async dispatch => {
  const { flows } = await getFlowsByProjectService(project);
  dispatch( {
    type: actions.GET_FLOWS,
    payload: flows,
  });
}
export const createFlow = (params) => async dispatch => {
  const { flow } = await createFlowService(params);
  dispatch({
    type: actions.CREATE_FLOW,
    payload: flow,
  })
};
export const editFlow = (currentConfig,newConfig) => async dispatch => {
  const { flow } = await editFlowConfigService(currentConfig._id, newConfig);
  dispatch({
    type: actions.UPDATE_FLOW,
    payload: flow,
  })
};
export const moveFlow = (currentConfig,newConfig) => async dispatch => {
  const { flow } = await moveFlowService(currentConfig._id, newConfig);
  dispatch({
    type: actions.UPDATE_FLOW,
    payload: flow,
  })
};
export const deleteFlow = (flow) => async dispatch => {
  await deleteFlowService(flow._id);
  dispatch({
    type: actions.DELETE_FLOW,
    payload: flow,
  })
};