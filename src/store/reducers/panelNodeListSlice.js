import { createSlice } from "@reduxjs/toolkit";
import { createPanelNodeList } from "components/FlowEditor/helpers/nodeObjectHelper";

const panelNodeList = createPanelNodeList();

export const panelNodeListSlice = createSlice({
  name: "panelNodeListReducer",
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

export const { setNodeList, addNodeToFavorites } = panelNodeListSlice.actions;
export default panelNodeListSlice.reducer;
