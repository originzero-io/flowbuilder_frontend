import { createProjectService, deleteProjectService, getProjectsByWorkspaceService, updateProjectService } from "../../services/projectService";
import * as action from "../constants/projectContants";
export const setActiveProject = (params) => {
  return {
    type: action.SET_ACTIVE_PROJECT,
    payload: params,
  };
};
export const loadProjects = (teams) => async dispatch => {
  const projects = await getProjectsByWorkspaceService(teams);
  dispatch( {
    type: action.LOAD_PROJECTS,
    payload: projects,
  });
};
export const createProject = (projectInfo) => async dispatch => {
  const { project } = await createProjectService(projectInfo);
  dispatch({
    type: action.CREATE_PROJECT,
    payload: project,
  });
};
export const updateProject = (currentProject,projectInfo) => async dispatch => {
  const { project } = await updateProjectService(currentProject, projectInfo);
  console.log("UPDATE-DATA", project);
  dispatch({
    type: action.UPDATE_PROJECT,
    payload: project,
  });
};
export const deleteProject = (project) => async dispatch => {
  await deleteProjectService(project._id);
  dispatch({
    type: action.DELETE_PROJECT,
    payload: project._id,
  })
};