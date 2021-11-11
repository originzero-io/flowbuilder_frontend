import { createWorkspaceService, deleteWorkspaceService, editWorkspaceService, getWorkspacesService } from "../../services/workspaceService";
import * as action from "../constants/workspaceConstants";
import { setError } from "./errorActions";
export const setActiveWorkspace = (params) =>  {
  return {
    type: action.SET_ACTIVE_WORKSPACE,
    payload: params,
  };
};
export const getWorkspaces = () => async dispatch => {
  try {
    const workspaces = await getWorkspacesService();
    dispatch( {
      type: action.GET_WORKSPACES,
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
      type: action.CREATE_WORKSPACE,
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
      type: action.EDIT_WORKSPACE,
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
      type: action.DELETE_WORKSPACE,
      payload: workspace._id,
    });
  } catch (error) {
    dispatch(setError(error));
  }
};