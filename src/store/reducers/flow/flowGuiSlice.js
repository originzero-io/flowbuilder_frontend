import { createSlice } from "@reduxjs/toolkit";

const flowGuiSlice = createSlice({
  name: "flowGui",
  initialState: {
    viewport: { x: 0, y: 0, zoom: 1 },
    miniMapDisplay: true,
    groupBarDisplay: false,
    edgeType: "step",
    theme: "dark",
    nodeGroupMenuDisplay: false,
    paneClickPosition: { x: 0, y: 0 },
  },
  reducers: {
    setCurrentFlowGui(state, { payload }) {
      return payload;
    },
    setPaneClickPosition(state, { payload }) {
      state.paneClickPosition = payload;
    },
    setTheme(state, { payload }) {
      state.theme = payload;
    },
    setMiniMapDisplay(state, { payload }) {
      state.miniMapDisplay = payload;
    },
    setFlowEdgeType(state, { payload }) {
      state.edgeType = payload;
    },
    setGroupBarDisplay(state, { payload }) {
      state.groupBarDisplay = payload;
    },
    closeAllNodeGroupMenu(state, { payload }) {
      state.nodeGroupMenuDisplay = payload;
    },
  },
});

export default flowGuiSlice.reducer;
export const {
  setCurrentFlowGui,
  setPaneClickPosition,
  setReactFlowInstance,
  setTheme,
  setMiniMapDisplay,
  setFlowEdgeType,
  setGroupBarDisplay,
  closeAllNodeGroupMenu,
} = flowGuiSlice.actions;
