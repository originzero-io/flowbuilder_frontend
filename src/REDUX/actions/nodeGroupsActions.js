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
export const deleteNodeCurrentGroup = (self) => ({
  type: action.DELETE_NODE_CURRENT_GROUP,
  payload: self
});
export const addNodeToGroupSingle= (self,group) => ({
  type: action.ADD_NODE_TO_GROUP_SINGLE,
  payload: {self,group}
});
export const addNodeToGroupMultiple= (selected,group) => ({
  type: action.ADD_NODE_TO_GROUP_MULTIPLE,
  payload: {selected,group}
});