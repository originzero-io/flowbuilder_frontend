import * as actions from "../../constants/groupContants";
import FlowGroupService, { createGroupService, deleteGroupService, getGroupsService, updateGroupService } from "services/configurationService/groupService";

const flowGroupsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case actions.GET_GROUPS:
      return payload;
    case actions.CREATE_GROUP:
      return [...state, payload];
    case actions.UPDATE_GROUP:
      return state.map(state=>state._id === payload._id ? payload : state);
    case actions.DELETE_GROUP:
      return state.filter(state=>state._id !== payload._id);
    default:
      return state;
  }
};
export default flowGroupsReducer;

export const getGroups = (flow_id) => async dispatch => {
  const { groups } = await FlowGroupService.getGroups(flow_id);
  dispatch({
    type: actions.GET_GROUPS,
    payload: groups
  })
};
export const createGroup= (flow_id,group) => async dispatch => {
  const new_group = await FlowGroupService.createGroup(flow_id, group);
  dispatch({
    type: actions.CREATE_GROUP,
    payload: new_group.group
  })
};
export const updateGroup= (currentGroup) => async dispatch => {
  const { group } = await FlowGroupService.updateGroup(currentGroup);
  dispatch({
    type: actions.UPDATE_GROUP,
    payload: group
  })
};
export const deleteGroup = (group) => async dispatch => {
  await FlowGroupService.deleteGroup(group);
  dispatch({
    type: actions.DELETE_GROUP,
    payload: group
  })
};