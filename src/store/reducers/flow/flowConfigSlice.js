import { createSlice } from "@reduxjs/toolkit";

export const flowConfigSlice = createSlice({
  name: "flowConfig",
  initialState: {},
  reducers: {
    setCurrentFlowConfig(state, { payload }) {
      return payload;
    }
  }
});

export default flowConfigSlice.reducer;
export const { setCurrentFlowConfig } = flowConfigSlice.actions;