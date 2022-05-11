import notification from "utils/notificationHelper";
import {
  getMyWorkspacesService
} from "services/configurationService/workspaceService";
import WorkspaceService from "services/configurationService/workspaceService"
import * as actions from "../constants/workspaceConstants";

const initialState = {
  activeWorkspace: "",
  workspaces: [],
};
const workspaceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SET_ACTIVE_WORKSPACE:
      return { ...state, activeWorkspace: payload };
    case actions.GET_WORKSPACES:
      return { ...state, workspaces: payload };
    case actions.CREATE_WORKSPACE:
      return { ...state, workspaces: [...state.workspaces, payload] };
    case actions.EDIT_WORKSPACE:
      return {
        activeWorkspace: payload,
        workspaces: state.workspaces.map((state) => {
          if (state._id === payload._id) {
            return payload;
          } else return state;
        }),
      };
    case actions.DELETE_WORKSPACE:
      return {
        ...state,
        workspaces: state.workspaces.filter((s) => s._id !== payload),
      };
    default:
      return state;
  }
};
export default workspaceReducer;

export const setActiveWorkspace = (params) => {
  return {
    type: actions.SET_ACTIVE_WORKSPACE,
    payload: params,
  };
};
export const getMyWorkspaces = () => async (dispatch) => {
  try {
    //const workspaces = await getMyWorkspacesService();
    const workspaces = await WorkspaceService.getMyWorkspaces();
    dispatch({
      type: actions.GET_WORKSPACES,
      payload: workspaces,
    });
  } catch (error) {
    notification.error(error.message);
  }
};
export const createWorkspace = (workspace) => ({
  type: actions.CREATE_WORKSPACE,
  payload: workspace,
});
export const editWorkspace = (workspace) => ({
  type: actions.EDIT_WORKSPACE,
  payload: workspace,
});
export const deleteWorkspace = (workspace) => ({
  type: actions.DELETE_WORKSPACE,
  payload: workspace._id,
});
