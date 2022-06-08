import FlowGroupService from "services/configurationService/groupService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getGroups = createAsyncThunk(
  'groups/get',
  async (flow_id) => {
    return await FlowGroupService.getGroups(flow_id);
  }
)
export const createGroup = createAsyncThunk(
  'groups/create',
  async ({ flowId, group }) => {
    return await FlowGroupService.createGroup(flowId, group);
  }
)
export const updateGroup = createAsyncThunk(
  'groups/update',
  async (currentGroup) => {
    console.log("currentGroup: ", currentGroup);
    return await FlowGroupService.updateGroup(currentGroup);
  }
)
export const deleteGroup = createAsyncThunk(
  'groups/delete',
  async (group) => {
    return await FlowGroupService.deleteGroup(group);
  }
)

export const flowGroupsSlice = createSlice({
  name: 'flowGroups',
  initialState: [],
  extraReducers: {
    [getGroups.fulfilled]: (state, { payload }) => {
      return payload.groups
    },
    [createGroup.fulfilled]: (state, { payload }) => {
      state.push(payload.group);
    },
    [updateGroup.fulfilled]: (state, { payload }) => {
      const index = state.findIndex(group => group._id === payload.group._id);
      state[index] = {
        ...state[index],
        ...payload,
      };
    },
    [deleteGroup.fulfilled]: (state, { payload }) => {
      return state.filter((group) => group._id !== payload.group._id)
    }
  },
})

export default flowGroupsSlice.reducer;