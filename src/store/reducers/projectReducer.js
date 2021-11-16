import * as actions from "../constants/projectContants";
import { createProjectService, deleteProjectService, getProjectsByWorkspaceService, updateProjectService } from "../../services/projectService";

const initialState = {
  activeProject: "",
  projects:[]
}
const projectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.GET_PROJECTS:
      return { ...state, projects: payload }
    case actions.CREATE_PROJECT:
      return { ...state, projects: [...state.projects, payload] };
    case actions.SET_ACTIVE_PROJECT:
      return { ...state, activeProject: payload }
    case actions.UPDATE_PROJECT:
      return {
        activeProject:payload,
        projects: state.projects.map((state) => {
          if (state._id === payload._id) {
            return payload;
          } else return state;
        }),
      };
    case actions.DELETE_PROJECT:
      return { ...state, projects: state.projects.filter(s => s._id !== payload) }
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
export const loadProjects = (teams) => async dispatch => {
  const projects = await getProjectsByWorkspaceService(teams);
  dispatch( {
    type: actions.GET_PROJECTS,
    payload: projects,
  });
};
export const createProject = (projectInfo) => async dispatch => {
  const { project } = await createProjectService(projectInfo);
  dispatch({
    type: actions.CREATE_PROJECT,
    payload: project,
  });
};
export const updateProject = (currentProject,projectInfo) => async dispatch => {
  const { project } = await updateProjectService(currentProject, projectInfo);
  console.log("UPDATE-DATA", project);
  dispatch({
    type: actions.UPDATE_PROJECT,
    payload: project,
  });
};
export const deleteProject = (project) => async dispatch => {
  await deleteProjectService(project._id);
  dispatch({
    type: actions.DELETE_PROJECT,
    payload: project._id,
  })
};