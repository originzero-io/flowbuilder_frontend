import { createSlice } from "@reduxjs/toolkit";
import NodeClass from "components/FlowEditor/helpers/NodeClass";

const nodeClass = new NodeClass("nodeClass is created by redux store");

export const nodeClassSlice = createSlice({
  name: "nodeClass",
  initialState: { nodeClass },
  reducers: {},
});

export default nodeClassSlice.reducer;
