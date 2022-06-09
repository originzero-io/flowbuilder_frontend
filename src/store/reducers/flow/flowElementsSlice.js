import { isEdge, isNode } from "react-flow-renderer";
import FlowElementService from "services/configurationService/flowElementService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getElementsByFlow = createAsyncThunk(
  "elements/getByFlow",
  async (flow) => {
    return await FlowElementService.getElements(flow._id);
  }
);

export const flowElementsSlice = createSlice({
  name: "elements",
  initialState: [],
  reducers: {
    setElements(state, { payload }) {
      return payload;
    },
    importElements(state, { payload }) {
      return payload;
    },
    addNewNode(state, { payload }) {
      state.push(payload);
    },
    pasteNodes(state, { payload }) {
      state.push(...payload);
    },
    setRotateAll(state, { payload }) {
      state.forEach((element) => {
        if (isNode(element)) {
          element.data.align = payload;
        }
      });
    },
    setExpandAll(state, { payload }) {
      state.forEach((element) => {
        if (isNode(element)) {
          element.data.expand = payload;
        }
      });
    },
    rotateNode(state, { payload }) {
      state.forEach((element) => {
        if (element.id === payload.self.id) {
          element.data.align = payload.path;
        } else return element;
      });
    },
    rotateMultiNode(state, { payload }) {
      state.forEach((element) => {
        if (payload.selectedIDArray.includes(element.id)) {
          element.data.align = payload.path;
        }
      });
    },
    expandNode(state, { payload }) {
      state.forEach((element) => {
        if (element.id === payload.id) {
          element.data.expand = !payload.data.expand;
        }
      });
    },
    changeNodeName(state, { payload }) {
      state.forEach((element) => {
        if (element.id === payload.self.id) {
          element.data.label = payload.newName;
        }
      });
    },
    setNodeEnable(state, { payload }) {
      state.forEach((element) => {
        if (element.id === payload.self.id) {
          element.data.enable = payload.checked;
        }
      });
    },
    changeEdgeType(state, { payload }) {
      state.forEach((element) => {
        if (isEdge(element)) {
          element.type = payload;
        }
      });
    },
    setMultipleNodeEnable(state, { payload }) {
      state.forEach((element) => {
        if (payload.includes(element.id)) {
          element.data.enable = !element.data.enable;
        }
      });
    },
    setOutgoersEnable(state, { payload }) {
      state.forEach((element) => {
        if (payload.outgoersIds.includes(element.id)) {
          element.data.enable = payload.enable;
        }
      });
    },
    setAllNodesDeselect(state, { payload }) {
      state.forEach((element) => {
        if (isEdge(element)) {
          element.animated = false;
        } else if (isNode(element)) {
          element.data.selected = false;
        }
      });
    },
    setGroupSingle(state, { payload }) {
      state.forEach((element) => {
        if (isNode(element)) {
          if (element.id === payload.self.id) {
            element.data.group = payload.group;
          }
        }
        else if (isEdge(element)) {
          if (element.source === payload.self.id) {
            element.group = payload.group;
            element.style.stroke = payload.group.color;
          }
        }
      });
    },
    setGroupMultiple(state, { payload }) {
      state.forEach((element) => {
        if (isNode(element)) {
          if (payload.selectedIDArray.includes(element.id)) {
            element.data.group = payload.group;
          }
        }
        else if (isEdge(element)) {
          if (payload.selectedIDArray.includes(element.source)) {
            element.group = payload.group;
            element.style.stroke = payload.group.color;
          }
        }
      });
    },
    selectNodes(state, { payload }) {
      state.forEach((element) => {
        if (payload.includes(element.id)) {
          if (isEdge(element)) {
            element.animated = true;
          } else if (isNode(element)) {
            element.data.selected = true;
          }
        } else {
          if (isEdge(element)) {
            if (
              payload.includes(element.source) ||
              payload.includes(element.target)
            ) {
              element.animated = true;
            } else element.animated = false;
          } else if (isNode(element)) {
            element.data.selected = false;
          }
        }
      });
    },
    deleteGroupOfElement(state, { payload }) {
      state.forEach((element) => {
        if (isNode(element)) {
          if (element.data.group._id === payload) {
            element.data.group = {};
          }
        }
        else if (isEdge(element)) {
          if (element.group._id === payload) {
            element.group = {};
            element.style.stroke = "";
          }
        }
      });
    },
    updateGroupOfElement(state, { payload }) {
      state.forEach((element) => {
        if (isNode(element)) {
          if (element.data.group._id === payload._id) {
            element.group.name = payload.name;
            element.group.color = payload.color;
            element.style.stroke = payload.color;
          }
        }
        else if (isEdge(element)) {
          if (element.group._id && element.group._id === payload._id) {
            element.group.name = payload.name;
            element.group.color = payload.color;
            element.style.stroke = payload.color;
          }
        }
      });
    },
    updateNodeHandles(state, { payload }) {
      state.forEach((element) => {
        if (element.id === payload.self.id) {
          element.data[payload.name] = payload.value;
        } else return element;
      });
    },
    saveElements(state, { payload }) {
      return payload;
    }
  },
  extraReducers: {
    [getElementsByFlow.fulfilled]: (state, { payload }) => {
      return payload.elements;
    }
  },
});

export default flowElementsSlice.reducer;
export const {
  setElements,
  importElements,
  addNewNode,
  pasteNodes,
  setRotateAll,
  setExpandAll,
  rotateNode,
  rotateMultiNode,
  expandNode,
  changeNodeName,
  setNodeEnable,
  setMultipleNodeEnable,
  changeEdgeType,
  setOutgoersEnable,
  setAllNodesDeselect,
  setGroupSingle,
  setGroupMultiple,
  selectNodes,
  deleteGroupOfElement,
  updateGroupOfElement,
  updateNodeHandles,
  saveElements
} = flowElementsSlice.actions;
