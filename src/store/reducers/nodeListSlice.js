import { createSlice } from "@reduxjs/toolkit";
import { createPanelNodeList } from "components/FlowEditor/helpers/nodeTypeHelper";

const panelNodeList = createPanelNodeList();

export const nodeListSlice = createSlice({
  name: "nodeListReducer",
  initialState: panelNodeList,
  reducers: {
    setNodeList(state, { payload }) {
      return payload;
    },
    addNodeToFavorites(state, { payload }) {
      return state.map((node) =>
        node.id === payload.id ? { ...node, fav: !node.fav } : node,
      );
    },
  },
});

export const { setNodeList, addNodeToFavorites } = nodeListSlice.actions;
export default nodeListSlice.reducer;
