import * as action from "../constants/nodeGroupsContants";

export const loadGroups= (data) => ({
  type: action.LOAD_GROUPS,
  payload: data
});
export const addGroup= (data) => ({
  type: action.ADD_GROUP,
  payload: data
});
export const updateGroup= (data) => ({
  type: action.UPDATE_GROUP,
  payload: data
});
export const deleteGroup= (data) => ({
  type: action.DELETE_GROUP,
  payload: data
});