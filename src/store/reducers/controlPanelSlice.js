import { createSlice } from "@reduxjs/toolkit";

export const controlPanelSlice = createSlice({
  name: 'controlPanelReducer',
  initialState: {
    activeProject: {},
    copiedElements: []
  },
  reducers: {
    setCopiedElements(state, { payload }) {
      state.copiedElements = payload
    }
  }
})

export const { setCopiedElements } = controlPanelSlice.actions;
export default controlPanelSlice.reducer;