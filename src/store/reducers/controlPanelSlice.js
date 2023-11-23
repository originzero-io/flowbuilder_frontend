import { createSlice } from "@reduxjs/toolkit";

export const controlPanelSlice = createSlice({
  name: "controlPanelReducer",
  initialState: {
    activeProject: {},
    copiedNodes: [],
    selectedFlow: {},
  },
  reducers: {
    setCopiedNodes(state, { payload }) {
      state.copiedNodes = payload;
    },
    selectFlow(state, { payload }) {
      state.selectedFlow = payload;
    },
  },
});

export const { setCopiedNodes, selectFlow } = controlPanelSlice.actions;
export default controlPanelSlice.reducer;
