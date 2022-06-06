import FlowService, {
  getFlowsByProjectService,
  getFlowsByWorkspaceService
} from "services/configurationService/flowService";
import * as actions from "../../constants/flowConstants";

export const flowReducer = (state = [], { type, payload }) => {
  switch (type) {
    case actions.CREATE_FLOW:
      return [...state, payload];
    case actions.DELETE_FLOW:
      return state.filter((state) => state._id !== payload);
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

export const getFlowsByWorkspace = (workspace) => async (dispatch) => {
  const { flows } = await FlowService.getFlowsByWorkspace(workspace);
  if (workspace) {
    dispatch({
      type: actions.GET_FLOWS,
      payload: flows,
    });
  } else {
    dispatch({
      type: actions.GET_FLOWS,
      payload: [],
    });
  }
};
export const getFlowsByProject = (project) => async (dispatch) => {
  const { flows } = await FlowService.getFlowsByProject(project);
  dispatch({
    type: actions.GET_FLOWS,
    payload: flows,
  });
};
export const createFlow = (flow) => ({
  type: actions.CREATE_FLOW,
  payload: flow,
});
export const editFlow = (newFlow) => ({
  type: actions.UPDATE_FLOW,
  payload: newFlow,
});
export const moveFlow = (flow) => ({
  type: actions.UPDATE_FLOW,
  payload: flow,
});
export const deleteFlow = (flowId) => ({
  type: actions.DELETE_FLOW,
  payload: flowId,
});
