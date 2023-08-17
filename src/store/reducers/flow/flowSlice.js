import FlowService from "services/configurationService/flowService/flowService.http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getFlowsByWorkspace = createAsyncThunk(
  "flows/getByWorkspace",
  async (workspace) => await FlowService.getFlowsByWorkspace(workspace)
);
export const getFlowsByProject = createAsyncThunk(
  "flows/getByProject",
  async (project) => await FlowService.getFlowsByProject(project)
);

export const flowSlice = createSlice({
  name: "flows",
  initialState: [],
  reducers: {
    createFlow(state, { payload }) {
      state.push(payload);
    },
    editFlow(state, { payload }) {
      const index = state.findIndex((flow) => flow._id === payload._id);
      state[index] = payload;
    },
    moveFlow(state, { payload }) {
      const index = state.findIndex((flow) => flow._id === payload._id);
      state[index] = payload;
    },
    deleteFlow(state, { payload }) {
      return state.filter((flow) => flow._id !== payload);
    },
  },
  extraReducers: {
    [getFlowsByProject.fulfilled]: (state, { payload }) => payload,
    [getFlowsByWorkspace.fulfilled]: (state, { payload }) => payload,
  },
});

export default flowSlice.reducer;
export const { setActiveProject, createFlow, editFlow, moveFlow, deleteFlow } =
  flowSlice.actions;
