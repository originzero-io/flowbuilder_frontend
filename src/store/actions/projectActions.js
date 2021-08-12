import * as action from "../constants/projectContants";
export const loadProjects = (params) => {
  return {
    type: action.LOAD_PROJECTS,
    payload: params,
  };
};
export const createProject = (params) => {
  return {
    type: action.CREATE_PROJECT,
    payload: params,
  };
};
export const deleteProject = (id) => {
  return {
    type: action.DELETE_PROJECT,
    payload: id,
  };
};