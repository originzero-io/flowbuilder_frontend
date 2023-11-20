import { createSlice } from "@reduxjs/toolkit";

const selectedFlowSlice = createSlice({
  name: "selectedFlow",
  initialState: {},
  reducers: {
    selectFlow(state, { payload }) {
      return payload;
    },
  },
});

export default selectedFlowSlice.reducer;
export const { selectFlow } = selectedFlowSlice.actions;
