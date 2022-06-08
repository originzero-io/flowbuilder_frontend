import FlowService from "services/configurationService/flowService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getFlowsByWorkspace = createAsyncThunk(
  'flows/getByWorkspace',
  async (workspace) => {
    return await FlowService.getFlowsByWorkspace(workspace);
  }
)
export const getFlowsByProject = createAsyncThunk(
  'flows/getByProject',
  async (project) => {
    return await FlowService.getFlowsByProject(project);
  }
)

export const flowSlice = createSlice({
  name: 'flows',
  initialState: [],
  reducers: {
    setActiveProject(state, { payload }) {
      state.activeProject = payload
    },
    createFlow(state, { payload }) {
      state.push(payload);
    },
    editFlow(state, { payload }) {
      const index = state.findIndex(flow => flow._id === payload._id);
      state[index] = {
        ...state[index],
        ...payload,
      };
    },
    moveFlow(state, { payload }) {
      const index = state.findIndex(flow => flow._id === payload._id);
      state[index] = {
        ...state[index],
        ...payload,
      };
    },
    deleteFlow(state, { payload }) {
      return state.filter((flow) => flow._id !== payload)
    },
  },
  extraReducers: {
    [getFlowsByProject.fulfilled]: (state, { payload }) => {
      return payload.flows;
    },
    [getFlowsByWorkspace.fulfilled]: (state, { payload }) => {
      return payload.flows;
    },
  },
})

export default flowSlice.reducer;
export const { setActiveProject,createFlow,editFlow,moveFlow,deleteFlow } = flowSlice.actions;
