import { createSlice } from "@reduxjs/toolkit";

export const controlPanelSlice = createSlice({
  name: "controlPanelReducer",
  initialState: {
    activeProject: {},
    copiedNodes: [],
  },
  reducers: {
    setCopiedNodes(state, { payload }) {
      state.copiedNodes = payload;
    },
  },
});

export const { setCopiedNodes } = controlPanelSlice.actions;
export default controlPanelSlice.reducer;
