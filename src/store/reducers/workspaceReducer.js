import * as actions from "../constants/workspaceConstants";
import { createWorkspaceService, deleteWorkspaceService, editWorkspaceService, getWorkspacesService } from "../../services/workspaceService";
import { setError } from "./errorReducer";

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
        activeWorkspace:payload,
        workspaces: state.workspaces.map((state) => {
          if (state._id === payload._id) {
            return payload;
          } else return state;
        }),
      };
    case actions.DELETE_WORKSPACE:
      return { ...state, workspaces: state.workspaces.filter((s) => s._id !== payload) };
    default:
      return state;
  }
};
export default workspaceReducer;

export const setActiveWorkspace = (params) =>  {
  return {
    type: actions.SET_ACTIVE_WORKSPACE,
    payload: params,
  };
};
export const getWorkspaces = () => async dispatch => {
  try {
    const workspaces = await getWorkspacesService();
    dispatch( {
      type: actions.GET_WORKSPACES,
      payload: workspaces,
    });
  }
  catch (error) {
    dispatch(setError(error));
  }
};
export const createWorkspace = (params) => async dispatch => {
  try {
    const { workspace } = await createWorkspaceService(params);
    dispatch({
      type: actions.CREATE_WORKSPACE,
      payload: workspace,
    });
  } catch (error) {
    dispatch(setError(error));
  }
};
export const editWorkspace = (activeWorkspace, newWorkspace) => async dispatch => {
  try {
    const { workspace } = await editWorkspaceService(activeWorkspace._id, newWorkspace);
    dispatch({
      type: actions.EDIT_WORKSPACE,
      payload: workspace,
    });
  } catch (error) {
    dispatch(setError(error));
  }
};
export const deleteWorkspace = (workspace) => async dispatch => {
  try {
    await deleteWorkspaceService(workspace);
    dispatch({
      type: actions.DELETE_WORKSPACE,
      payload: workspace._id,
    });
  } catch (error) {
    dispatch(setError(error));
  }
};