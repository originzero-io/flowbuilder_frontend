import { createGroupService, deleteGroupService, getGroupsService, updateGroupService } from "../../services/groupService";
import * as action from "../constants/groupContants";

export const getGroups = (flow_id) => async dispatch => {
  const { groups } = await getGroupsService(flow_id);
  dispatch({
    type: action.GET_GROUPS,
    payload: groups
  })
};
export const createGroup= (flow_id,group) => async dispatch => {
  const new_group = await createGroupService(flow_id, group);
  dispatch({
    type: action.ADD_GROUP,
    payload: new_group.group
  })
};
export const updateGroup= (currentGroup) => async dispatch => {
  const { group } = await updateGroupService(currentGroup);
  dispatch({
    type: action.UPDATE_GROUP,
    payload: group
  })
};
export const deleteGroup= (group) => async dispatch => {
  await deleteGroupService(group);
  dispatch({
    type: action.DELETE_GROUP,
    payload: group
  })
};