// import { isEdge, isNode } from "react-flow-renderer";
// import undoable, { includeAction } from "redux-undo";
// import FlowElementService, { getElementsService } from "services/configurationService/flowElementService";
// import * as actions from "../../constants/elementsContants";

// const elementReducer = (state = [], { type, payload }) => {
//   switch (type) {
//     case actions.SET_ELEMENTS:
//       return payload;
//     case actions.IMPORT_ELEMENTS:
//       return [...state, ...payload];
//     case actions.ADD_NEW_NODE:
//       return [...state, payload];
//     case actions.PASTE_NODES:
//       return [...state, ...payload];
//     case actions.SET_ROTATE_ALL:
//       return state.map((state) => {
//         if (isNode(state)) {
//           return {
//             ...state,
//             data: {
//               ...state.data,
//               align: payload,
//             },
//           };
//         }
//         else return state;
//       });
//     case actions.SET_EXPAND_ALL:
//       return state.map((state) => {
//         if (isNode(state)) {
//           return {
//             ...state,
//             data: {
//               ...state.data,
//               expand: payload,
//             },
//           };
//         }
//         else return state;
//       });
//     case actions.ROTATE_NODE:
//       return state.map((state) => {
//         if (state.id === payload.self.id) {
//           return {
//             ...state,
//             data: {
//               ...state.data,
//               align: payload.path,
//             },
//           };
//         }
//         return state;
//       });
//     case actions.ROTATE_MULTI_NODE:
//       return state.map((state) => {
//         if (payload.selectedIDArray.includes(state.id)) {
//           return {
//             ...state,
//             data: {
//               ...state.data,
//               align: payload.path,
//             },
//           };
//         }
//         return state;
//       });
//     case actions.EXPAND_NODE:
//       return state.map((state) => {
//         if (state.id === payload.self.id) {
//           return {
//             ...state,
//             data: {
//               ...state.data,
//               expand: !payload.self.data.expand,
//             },
//           };
//         }
//         return state;
//       });
//     case actions.CHANGE_NODE_NAME:
//       return state.map((state) => {
//         if (state.id === payload.self.id) {
//           return {
//             ...state,
//             data: {
//               ...state.data,
//               label: payload.editedName,
//             },
//           };
//         }
//         return state;
//       });
//     case actions.SET_NODE_ENABLE:
//       return state.map((state) => {
//         if (state.id === payload.self.id) {
//           return {
//             ...state,
//             data: {
//               ...state.data,
//               enable: payload.checked,
//             },
//           };
//         }
//         return state;
//       });
//     case actions.CHANGE_EDGE_TYPE:
//       return state.map((state) => {
//         if (isEdge(state)) {
//           return {
//             ...state,
//             type:payload
//           };
//         }
//         return state;
//       });
//     case actions.SET_NODE_ENABLE_MULTIPLE:
//       return state.map((state) => {
//         if (payload.selectedIDArray.includes(state.id)) {
//           return {
//             ...state,
//             data: {
//               ...state.data,
//               enable: !state.data.enable,
//             },
//           };
//         }
//         return state;
//       });
//     case actions.SET_OUTGOERS_ENABLE:
//       return state.map((state) => {
//         if (payload.outgouersIdArray.includes(state.id)) {
//           return {
//             ...state,
//             data: {
//               ...state.data,
//               enable: payload.enable,
//             },
//           };
//         }
//         return state;
//       });
//     case actions.SET_ALL_NODES_DESELECT:
//       return state.map((state) => {
//         if (isEdge(state)) {
//           return {
//             ...state,
//             animated: false,
//           };
//         }
//         else if (isNode(state)) {
//           return {
//             ...state,
//             data: {
//               ...state.data,
//               selected: false,
//             },
//           };
//         }
//       });
//     case actions.SET_GROUP_SINGLE:
//       return state.map((state) => {
//         if (isNode(state)) {
//           if (state.id === payload.self.id) {
//             return {
//               ...state,
//               data: {
//                 ...state.data,
//                 group:payload.group,
//               },
//             };
//           }
//           return state;
//         }
//         else if (isEdge(state)) {
//           if (state.source === payload.self.id) {
//             return {
//               ...state,
//               group: payload.group,
//               style: {
//                 ...state.style,
//                 stroke: payload.group.color,
//               },
//             };
//           }
//           return state;
//         }
//       });
//     case actions.SET_GROUP_MULTIPLE:
//       return state.map((state) => {
//         if (isNode(state)) {
//           if (payload.selectedIDArray.includes(state.id)) {
//             return {
//               ...state,
//               data: {
//                 ...state.data,
//                 group:payload.group,
//               },
//             };
//           }
//           return state;
//         }
//         else if (isEdge(state)) {
//           if (payload.selectedIDArray.includes(state.source)) {
//             return {
//               ...state,
//               group: payload.group,
//               style: {
//                 ...state.style,
//                 stroke: payload.group.color,
//               },
//             };
//           }
//           return state;
//         }
//       });
//     case actions.SELECT_NODES:
//       return state.map((els) => {
//         if (payload.includes(els.id)) {
//           if (isEdge(els)) {
//             return {
//               ...els,
//               animated: true,
//             };
//           } else if(isNode(els)) {
//             return {
//               ...els,
//               data: {
//                 ...els.data,
//                 selected: true
//               },
//             };
//           }
//         }
//         else {
//           if (isEdge(els)) {
//             if (payload.includes(els.source) || payload.includes(els.target)) {
//               return {
//                 ...els,
//                 animated:true
//               }
//             }
//             else {
//               return {
//                 ...els,
//                 animated: false,
//               };
//             }
//           } else if(isNode(els)) {
//             return {
//               ...els,
//               data: {
//                 ...els.data,
//                 selected: false,
//               },
//             };
//           }
//         }
//       });
//     case actions.DELETE_GROUP_OF_ELEMENT:
//       return state.map((els) => {
//         if (isNode(els)) {
//           if (els.data.group._id === payload) {
//             return {
//               ...els,
//               data: {
//                 ...els.data,
//                 group: {},
//               },
//             };
//           }
//           else return els;
//         }
//         else if (isEdge(els)) {
//           if (els.group._id === payload) {
//             return {
//               ...els,
//               group:{},
//               style: {
//                 ...els.style,
//                 stroke: ''
//               }
//             }
//           }
//           else return els;
//         }
//       });
//     case actions.UPDATE_GROUP_OF_ELEMENT:
//       return state.map((els) => {
//         if (isNode(els)) {
//           if (els.data.group._id === payload._id) {
//             return {
//               ...els,
//               data: {
//                 ...els.data,
//                 group: { ...els.data.group, name: payload.name, color: payload.color },
//               },
//             };
//           }
//           else return els;
//         }
//         else if (isEdge(els)) {
//           if (els.group._id && els.group._id === payload._id) {
//             return {
//               ...els,
//               group: { ...els.group, name: payload.name, color: payload.color },
//               style: {
//                 ...els.style,
//                 stroke: payload.color
//               }
//             }
//           }
//           else return els;
//         }
//       });
//     case actions.UPDATE_NODE_HANDLES:
//       return state.map((els) => {
//         if (els.id === payload.self.id) {
//           return {
//             ...els,
//             data: {
//               ...els.data,
//               [payload.name]: payload.value,
//             },
//           };
//         } else {
//           return els;
//         }
//       });
//     default:
//       return state;
//   }
// };
// ///21 adet
// const undoableElements = undoable(elementReducer, {
//   limit: 10,
//   filter: includeAction([
//     actions.SET_ELEMENTS,
//     actions.ADD_NEW_NODE,
//     actions.SET_EXPAND_ALL,
//     actions.SET_OUTGOERS_ENABLE,
//     actions.SET_NODE_ENABLE,
//     actions.SET_NODE_ENABLE_MULTIPLE,
//     actions.SET_ROTATE_ALL,
//     actions.CHANGE_EDGE_TYPE,
//     actions.CHANGE_NODE_NAME,
//     actions.EXPAND_NODE,
//     actions.ROTATE_NODE,
//     actions.ROTATE_MULTI_NODE,
//     actions.IMPORT_ELEMENTS,
//     actions.PASTE_NODES,
//     actions.SET_GROUP_SINGLE,
//     actions.SET_GROUP_MULTIPLE,
//     actions.UPDATE_NODE_HANDLES
//   ])
//   // filter: excludeAction([
//   //   actions.SELECT_NODES,
//   //   actions.SET_ALL_NODES_DESELECT,
//   //   flowActions.SET_CLICKED_ELEMENT,
//   //   flowActions.SET_CLOSE_ALL_GROUPS,
//   // ])
// });

// export default undoableElements;


// export const setElements = (data) => ({
//   type: actions.SET_ELEMENTS,
//   payload: data,
// });
// export const saveElements = (elements)=> ({
//   type: actions.SET_ELEMENTS,
//   payload: elements
// });
// export const getElementsByFlow = (flow)=> async dispatch => {
//   const { elements } = await FlowElementService.getElements(flow._id);
//   dispatch({
//     type: actions.SET_ELEMENTS,
//     payload: elements
//   })
// };
// export const addNewNode = (node) => ({
//   type: actions.ADD_NEW_NODE,
//   payload: node,
// });
// export const pasteNodes = (nodes) => ({
//   type: actions.PASTE_NODES,
//   payload: nodes,
// });
// export const setRotateAll = (data) => ({
//   type: actions.SET_ROTATE_ALL,
//   payload: data,
// });
// export const setExpandAll = (data) => ({
//   type: actions.SET_EXPAND_ALL,
//   payload: data,
// });
// export const rotateNode = (self, path) => ({
//   type: actions.ROTATE_NODE,
//   payload: { self, path },
// });
// export const rotateMultiNode = (selectedIDArray, path) => ({
//   type: actions.ROTATE_MULTI_NODE,
//   payload: { selectedIDArray, path },
// });
// export const expandNode = (self) => ({
//   type: actions.EXPAND_NODE,
//   payload: { self },
// });
// export const changeNodeName = (self, editedName) => ({
//   type: actions.CHANGE_NODE_NAME,
//   payload: { self, editedName },
// });
// export const setNodeEnable = (self, checked) => ({
//   type: actions.SET_NODE_ENABLE,
//   payload: { self, checked },
// });
// export const setMultipleNodeEnable = (selectedIDArray) => ({
//   type: actions.SET_NODE_ENABLE_MULTIPLE,
//   payload: { selectedIDArray },
// });
// export const setOutgoersEnable = (outgouersIdArray, enable) => ({
//   type: actions.SET_OUTGOERS_ENABLE,
//   payload: { outgouersIdArray, enable },
// });
// export const importElements = (data) => ({
//   type: actions.IMPORT_ELEMENTS,
//   payload: data,
// });
// export const changeEdgeType = (data) => ({
//   type: actions.CHANGE_EDGE_TYPE,
//   payload: data,
// });
// export const setGroupSingle = (self,group) => ({
//   type: actions.SET_GROUP_SINGLE,
//   payload:{self,group}
// });
// export const setGroupMultiple = (selectedIDArray,group) => ({
//   type: actions.SET_GROUP_MULTIPLE,
//   payload:{selectedIDArray,group}
// });
// export const selectNodes = (selectedIDArray) => ({
//   type: actions.SELECT_NODES,
//   payload:selectedIDArray
// });
// export const setAllNodesDeselect = () => ({
//   type: actions.SET_ALL_NODES_DESELECT
// });
// export const deleteGroupOfElement = (group) => ({
//   type: actions.DELETE_GROUP_OF_ELEMENT,
//   payload: group._id,
// });
// export const updateGroupOfElement = (editedGroup) => ({
//   type: actions.UPDATE_GROUP_OF_ELEMENT,
//   payload: editedGroup,
// });
// export const updateNodeHandles = (name, value, self) => ({
//   type: actions.UPDATE_NODE_HANDLES,
//   payload: { name, value, self },
// });


import { isEdge, isNode } from "react-flow-renderer";
import FlowElementService from "services/configurationService/flowElementService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getElementsByFlow = createAsyncThunk(
  "elements/getByFlow",
  async (flow) => {
    return await FlowElementService.getElements(flow._id);
  }
);
export const saveElements = createAsyncThunk(
  "elements/save",
  async ({ flowId, elements }) => {
    return await FlowElementService.saveElements(flowId, elements);
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
      return state.map((element) => {
        if (isNode(element)) {
          return (element.data.align = payload);
        } else return element;
      });
    },
    setExpandAll(state, { payload }) {
      return state.map((element) => {
        if (isNode(element)) {
          return (element.data.expand = payload);
        } else return element;
      });
    },
    rotateNode(state, { payload }) {
      return state.map((element) => {
        if (element.id === payload.self.id) {
          return (element.data.align = payload.path);
        } else return element;
      });
    },
    rotateMultiNode(state, { payload }) {
      return state.map((element) => {
        if (payload.selectedIDArray.includes(element.id)) {
          return (element.data.align = payload.path);
        } else return element;
      });
    },
    expandNode(state, { payload }) {
      return state.map((element) => {
        if (element.id === payload.self.id) {
          return (element.data.expand = !payload.self.data.expand);
        } else return element;
      });
    },
    changeNodeName(state, { payload }) {
      return state.map((element) => {
        if (element.id === payload.self.id) {
          return (element.data.label = payload.editedName);
        } else return element;
      });
    },
    setNodeEnable(state, { payload }) {
      return state.map((element) => {
        if (element.id === payload.self.id) {
          return (element.data.enable = payload.checked);
        } else return element;
      });
    },
    changeEdgeType(state, { payload }) {
      return state.map((element) => {
        if (isEdge(element)) {
          return (element.type = payload);
        } else return element;
      });
    },
    setMultipleNodeEnable(state, { payload }) {
      return state.map((element) => {
        if (payload.selectedIDArray.includes(element.id)) {
          return (element.data.enable = !element.data.enable);
        } else return element;
      });
    },
    setOutgoersEnable(state, { payload }) {
      return state.map((element) => {
        if (payload.outgoersIds.includes(element.id)) {
          return (element.enable = payload.enable);
        } else return element;
      });
    },
    setAllNodesDeselect(state, { payload }) {
      return state.map((element) => {
        if (isEdge(element)) {
          return (element.animated = false);
        } else if (isNode(element)) {
          return (element.data.selected = false);
        }
      });
    },
    setGroupSingle(state, { payload }) {
      return state.map((element) => {
        if (isNode(element)) {
          if (element.id === payload.self.id) {
            return (element.data.group = payload.group);
          } else return element;
        } else if (isEdge(element)) {
          if (element.source === payload.self.id) {
            element.group = payload.group;
            element.style.stroke = payload.group.color;
          } else return element;
        }
      });
    },
    setGroupMultiple(state, { payload }) {
      return state.map((element) => {
        if (isNode(element)) {
          if (payload.selectedIDArray.includes(element.id)) {
            return (element.data.group = payload.group);
          } else return element;
        } else if (isEdge(element)) {
          if (payload.selectedIDArray.includes(element.source)) {
            element.group = payload.group;
            element.style.stroke = payload.group.color;
          } else return element;
        }
      });
    },
    selectNodes(state, { payload }) {
      return state.map((element) => {
        if (payload.includes(element.id)) {
          if (isEdge(element)) {
            return (element.animated = true);
          } else if (isNode(element)) {
            return (element.selected = true);
          }
        } else {
          if (isEdge(element)) {
            if (
              payload.includes(element.source) ||
              payload.includes(element.target)
            ) {
              return (element.animated = true);
            } else return (element.animated = false);
          } else if (isNode(element)) {
            return (element.data.selected = false);
          }
        }
      });
    },
    deleteGroupOfElement(state, { payload }) {
      return state.map((element) => {
        if (isNode(element)) {
          if (element.data.group._id === payload) {
            return (element.data.group = {});
          } else return element;
        } else if (isEdge(element)) {
          if (element.group._id === payload) {
            element.group = {};
            element.style.stroke = "";
          } else return element;
        }
      });
    },
    updateGroupOfElement(state, { payload }) {
      return state.map((element) => {
        if (isNode(element)) {
          if (element.data.group._id === payload._id) {
            element.group.name = payload.name;
            element.group.color = payload.color;
            element.style.stroke = payload.color;
          } else return element;
        } else if (isEdge(element)) {
          if (element.group._id && element.group._id === payload._id) {
            element.group.name = payload.name;
            element.group.color = payload.color;
            element.style.stroke = payload.color;
          } else return element;
        }
      });
    },
    updateNodeHandles(state, { payload }) {
      return state.map((element) => {
        if (element.id === payload.self.id) {
          element.data[payload.name] = payload.value;
        } else return element;
      });
    }
  },
  extraReducers: {
    [getElementsByFlow.fulfilled]: (state, { payload }) => {
      console.log("payload: ", payload);
      return payload.elements;
    },
    [saveElements.fulfilled]: (state, { payload }) => {
      return payload.element;
    },
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
  updateNodeHandles
} = flowElementsSlice.actions;
