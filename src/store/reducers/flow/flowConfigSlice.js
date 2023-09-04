import { createSlice } from "@reduxjs/toolkit";

export const flowConfigSlice = createSlice({
  name: "flowConfig",
  initialState: {},
  reducers: {
    setActiveFlowConfig(state, { payload }) {
      return payload;
    },
  },
});

export default flowConfigSlice.reducer;
export const { setActiveFlowConfig } = flowConfigSlice.actions;
