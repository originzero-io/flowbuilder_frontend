import ProjectService, {
  getProjectsByWorkspaceService
} from "services/configurationService/projectService";
import * as actions from "../constants/projectContants";

const initialState = {
  activeProject: "",
  projects: [],
};
const projectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.GET_PROJECTS:
      return { ...state, projects: payload };
    case actions.CREATE_PROJECT:
      return { ...state, projects: [...state.projects, payload] };
    case actions.SET_ACTIVE_PROJECT:
      return { ...state, activeProject: payload };
    case actions.UPDATE_PROJECT:
      return {
        activeProject: payload,
        projects: state.projects.map((state) => {
          if (state._id === payload._id) {
            return payload;
          } else return state;
        }),
      };
    case actions.DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((s) => s._id !== payload),
      };
    default:
      return state;
  }
};
export default projectReducer;

export const setActiveProject = (params) => {
  return {
    type: actions.SET_ACTIVE_PROJECT,
    payload: params,
  };
};
export const getProjectsByWorkspace = (workspace) => async (dispatch) => {
  const projects = await ProjectService.getProjectsByWorkspace(workspace);
  dispatch({
    type: actions.GET_PROJECTS,
    payload: projects,
  });
};
export const createProject = (project) => ({
  type: actions.CREATE_PROJECT,
  payload: project,
});
export const updateProject = (project) => ({
  type: actions.UPDATE_PROJECT,
  payload: project,
});
export const deleteProject = (project) => ({
  type: actions.DELETE_PROJECT,
  payload: project._id,
});
