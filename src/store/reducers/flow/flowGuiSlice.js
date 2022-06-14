import { createSlice } from "@reduxjs/toolkit";

const flowGuiSlice = createSlice({
  name: "flowGui",
  initialState: {},
  reducers: {
    setCurrentFlowGui(state, { payload }) {
      return payload;
    },
    setPaneClickPosition(state, { payload }) {
      state.paneClickPosition = payload;
    },
    setReactFlowInstance(state, { payload }) {
      state.reactFlowInstance = payload;
    },
    setTheme(state, { payload }) {
      state.theme = payload;
    },
    setMiniMapDisplay(state, { payload }) {
      state.miniMapDisplay = payload;
    },
    setRotateAllPath(state, { payload }) {
      state.rotateAllPath = payload;
    },
    setFlowEdgeType(state, { payload }) {
      state.edgeType = payload;
    },
    setGroupBarDisplay(state, { payload }) {
      state.groupBarDisplay = payload;
    },
    closeAllNodeGroupMenu(state, { payload }) {
      state.nodeGroupMenuDisplay = payload;
    }
  }
});

export default flowGuiSlice.reducer;
export const {
  setCurrentFlowGui,
  setPaneClickPosition,
  setReactFlowInstance,
  setTheme,
  setMiniMapDisplay,
  setRotateAllPath,
  setFlowEdgeType,
  setGroupBarDisplay,
  closeAllNodeGroupMenu,
} = flowGuiSlice.actions;