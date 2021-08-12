import * as action from "../constants/teamConstants";
export const loadTeams = (params) => {
  return {
    type: action.LOAD_TEAMS,
    payload: params,
  };
};
export const setActiveTeam = (params) => {
  return {
    type: action.SET_ACTIVE_TEAM,
    payload: params,
  };
};
export const createTeam = (params) => {
  return {
    type: action.CREATE_TEAM,
    payload: params,
  };
};
export const deleteTeam = (id) => {
  return {
    type: action.DELETE_TEAM,
    payload: id,
  };
};