import {
  addEdge, updateEdge, applyEdgeChanges, applyNodeChanges, getOutgoers,
} from "reactflow";
import FlowElementService from "services/configurationService/flowElementService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isEdgeExist, setSourceNodeColorToEdge } from "components/FlowEditor/helpers/elementHelper";

export const getElementsByFlow = createAsyncThunk(
  "elements/getByFlow",
  async (flow) => await FlowElementService.getElements(flow._id),
);

export const flowElementsSlice = createSlice({
  name: "elements",
  initialState: {
    nodes: [],
    edges: [],
  },
  reducers: {
    setNodes(state, { payload }) {
      const appliedNodes = applyNodeChanges(payload, state.nodes);
      state.nodes = appliedNodes;
    },
    setEdges(state, { payload }) {
      const appliedEdges = applyEdgeChanges(payload, state.edges);
      state.edges = appliedEdges;
    },
    setElements(state, { payload }) {
      return payload;
    },
    addNewNode(state, { payload }) {
      state.nodes.push(payload);
    },
    addNewEdge(state, { payload }) {
      const newEdges = addEdge(payload, state.edges);
      state.edges = newEdges;
    },
    deleteNode(state, { payload }) {
      state.nodes = state.nodes.filter((node) => node.id !== payload.id);
    },
    deleteAllElements(state, { payload }) {
      state.nodes = [];
      state.edges = [];
    },
    updateEdgePath(state, { payload }) {
      const { oldEdge, newConnection } = payload;
      const edgeExist = isEdgeExist(newConnection, state.edges);

      if (edgeExist) {
        // remove old edge
        state.edges = state.edges.filter((edge) => edge.id !== oldEdge.id);
      } else {
        // update edge
        const updatedEdges = updateEdge(oldEdge, newConnection, state.edges);
        const newArray = setSourceNodeColorToEdge(
          newConnection,
          updatedEdges,
          state.nodes,
        );
        state.edges = newArray;
      }
    },
    pasteNodes(state, { payload }) {
      state.nodes.push(...payload);
    },
    setRotateAll(state, { payload }) {
      state.nodes.forEach((node) => {
        node.data.align = payload;
      });
    },
    setExpandAll(state, { payload }) {
      state.nodes.forEach((node) => {
        node.data.expand = payload;
      });
    },
    rotateNode(state, { payload }) {
      const node = payload;
      const currentAlign = node.data.align;

      state.nodes.forEach((node) => {
        if (node.id === payload.id) {
          node.data.align = currentAlign === "vertical" ? "horizontal" : "vertical";
        }
      });
    },
    rotateSelectedNodes(state, { payload }) {
      const { path } = payload;
      state.nodes.forEach((node) => {
        if (node.selected) {
          node.data.align = path;
        }
      });
    },
    deleteSelectedNodes(state, { payload }) {
      state.nodes = state.nodes.filter((node) => !node.selected);
      state.edges = state.edges.filter((edge) => !edge.selected);
    },
    expandNode(state, { payload }) {
      state.nodes.forEach((node) => {
        if (node.id === payload.id) {
          node.data.expand = !payload.data.expand;
        }
      });
    },
    selectElements(state, { payload }) {
      const nodeIds = payload.map((p) => p.id);

      // firstly, all nodes deselected
      state.nodes.forEach((node) => (node.selected = false));

      state.nodes.forEach((node) => {
        if (nodeIds.includes(node.id)) {
          node.selected = true;
        }
      });
    },
    changeNodeName(state, { payload }) {
      state.nodes.forEach((node) => {
        if (node.id === payload.node.id) {
          node.data.label = payload.name;
        }
      });
    },
    setNodeEnable(state, { payload }) {
      const { self, checked } = payload;

      state.nodes.forEach((node) => {
        if (node.id === self.id) {
          node.data.enable = checked;
        }
      });
    },
    changeEdgeType(state, { payload }) {
      state.edges.forEach((edge) => {
        edge.type = payload;
      });
    },
    setEnableSelectedNodes(state, { payload }) {
      state.nodes.forEach((node) => {
        if (node.selected) {
          node.data.enable = !node.data.enable;
        }
      });
    },
    setOutgoersEnable(state, { payload }) {
      const { self, enable } = payload;
      const outgoers = getOutgoers(self, state.nodes, state.edges);
      const outgoersIds = outgoers.map((o) => o.id);
      state.nodes.forEach((node) => {
        if (outgoersIds.includes(node.id)) {
          node.data.enable = enable;
        }
      });
    },
    setGroupSingle(state, { payload }) {
      state.nodes.forEach((node) => {
        if (node.id === payload.self.id) {
          node.data.group = payload.group;
        }
      });
      state.edges.forEach((edge) => {
        if (edge.source === payload.self.id) {
          edge.group = payload.group;
          edge.style.stroke = payload.group.color;
        }
      });
    },
    setGroupSelectedElements(state, { payload }) {
      state.nodes.forEach((node) => {
        if (node.selected) {
          node.data.group = payload;
        }
      });

      // ? target node un grubu değiştiğinde ona bağlı edge in rengi de değişiyor
      state.edges.forEach((edge) => {
        if (edge.selected) {
          edge.group = payload;
          edge.style.stroke = payload.color;
        }
      });
    },
    selectAllElements(state, { payload }) {
      state.nodes.forEach((node) => {
        node.selected = true;
      });
    },
    deleteGroupOfElement(state, { payload }) {
      state.nodes.forEach((node) => {
        if (node.data.group._id === payload) {
          node.data.group = { _id: 0 };
        }
      });
      state.edges.forEach((edge) => {
        if (edge.group._id === payload) {
          edge.group = { _id: 0 };
          edge.style.stroke = "";
        }
      });
    },
    updateGroupOfElement(state, { payload }) {
      console.log("groupOfElement payload: ", payload);
      const group = payload;
      state.nodes.forEach((node) => {
        if (node.data.group._id === group._id) {
          node.data.group.name = group.name;
          node.data.group.color = group.color;
        }
      });
      state.edges.forEach((edge) => {
        if (edge.group._id && edge.group._id === group._id) {
          edge.group.name = group.name;
          edge.group.color = group.color;
          edge.style.stroke = group.color;
        }
      });
    },
    updateNodeHandles(state, { payload }) {
      state.nodes.forEach((node) => {
        if (node.id === payload.self.id) {
          node.data[payload.name] = payload.value;
        }
      });
    },
    saveElements(state, { payload }) {
      return payload;
    },
    addSubFlow(state, { payload }) {
      state.nodes.push(
        {
          id: "A",
          type: "group",
          data: { label: null },
          position: { x: 0, y: 0 },
          style: {
            width: 350,
            height: 320,
          },
        },
        {
          id: "B",
          type: "input",
          data: { label: "child node 1" },
          position: { x: 10, y: 10 },
          parentNode: "A",
          extent: "parent",
        },
        {
          id: "C",
          data: { label: "child node 2" },
          position: { x: 10, y: 90 },
          parentNode: "A",
          extent: "parent",
        },
      );

      state.edges.push({ id: "b-c", source: "B", target: "C" });
    },
  },
  extraReducers: {
    [getElementsByFlow.fulfilled]: (state, { payload }) => payload.elements,
  },
});

export default flowElementsSlice.reducer;
export const {
  addSubFlow,
  setElements,
  setNodes,
  setEdges,
  addNewNode,
  addNewEdge,
  deleteNode,
  deleteAllElements,
  updateEdgePath,
  pasteNodes,
  setRotateAll,
  setExpandAll,
  rotateNode,
  rotateSelectedNodes,
  deleteSelectedNodes,
  expandNode,
  selectElements,
  changeNodeName,
  setNodeEnable,
  setEnableSelectedNodes,
  changeEdgeType,
  setOutgoersEnable,
  setGroupSingle,
  setGroupSelectedElements,
  selectAllElements,
  deleteGroupOfElement,
  updateGroupOfElement,
  updateNodeHandles,
  saveElements,
} = flowElementsSlice.actions;
