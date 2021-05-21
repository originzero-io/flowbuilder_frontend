import * as actionTypes from "../constants/elementsContants";
import undoable from "redux-undo"
import { isEdge, isNode } from "react-flow-renderer";
const elementReducer = (state = [], { type, payload }) => {
  switch (type) {
    case actionTypes.SET_ELEMENTS:
      return payload;
    case actionTypes.IMPORT_ELEMENTS:
      return [...state, ...payload];
    case actionTypes.ADD_NEW_NODE:
      return [...state, payload];   
    case actionTypes.PASTE_NODES:
      return [...state, ...payload];   
    case actionTypes.SET_ROTATE_ALL:
      return state.map((state) => {
        if (isNode(state)) {
          return {
            ...state,
            data: {
              ...state.data,
              align: payload,
            },
          };
        }
        else return state;
      });
    case actionTypes.SET_EXPAND_ALL:
      return state.map((state) => {
        if (isNode(state)) {
          return {
            ...state,
            data: {
              ...state.data,
              expand: payload,
            },
          };
        }
        else return state;
      });
    case actionTypes.ROTATE_NODE:
      return state.map((state) => {
        if (state.id === payload.self.id) {
          return {
            ...state,
            data: {
              ...state.data,
              align: payload.path,
            },
          };
        }
        return state;
      });
    case actionTypes.ROTATE_MULTI_NODE:
      return state.map((state) => {
        if (payload.selectedIDArray.includes(state.id)) {
          return {
            ...state,
            data: {
              ...state.data,
              align: payload.path,
            },
          };
        }
        return state;
      });
    case actionTypes.EXPAND_NODE:
      return state.map((state) => {
        if (state.id === payload.self.id) {
          return {
            ...state,
            data: {
              ...state.data,
              expand: !payload.self.data.expand,
            },
          };
        }
        return state;
      });
    case actionTypes.CHANGE_NODE_NAME:
      return state.map((state) => {
        if (state.id === payload.self.id) {
          return {
            ...state,
            data: {
              ...state.data,
              label: payload.editedName,
            },
          };
        }
        return state;
      });
    case actionTypes.SET_NODE_ENABLE:
      return state.map((state) => {
        if (state.id === payload.self.id) {
          return {
            ...state,
            data: {
              ...state.data,
              enable: payload.checked,
            },
          };
        }
        return state;
      });
    case actionTypes.CHANGE_EDGE_TYPE:
      return state.map((state) => {
        if (isEdge(state)) {
          return {
            ...state,
            type:payload
          };
        }
        return state;
      });  
    case actionTypes.SET_NODE_ENABLE_MULTIPLE:
      return state.map((state) => {
        if (payload.selectedIDArray.includes(state.id)) {
          return {
            ...state,
            data: {
              ...state.data,
              enable: !state.data.enable,
            },
          };
        }
        return state;
      });
    case actionTypes.SET_OUTGOERS_ENABLE:
      return state.map((state) => {
        if (payload.outgouersIdArray.includes(state.id)) {
          return {
            ...state,
            data: {
              ...state.data,
              enable: payload.enable,
            },
          };
        }
        return state;
      });
    case actionTypes.SET_ALL_NODES_DESELECT:
      return state.map((state) => {
        if (isEdge(state)) {
          return {
            ...state,
            animated: false,
          };
        }
        else if (isNode(state)) {
          return {
            ...state,
            data: {
              ...state.data,
              selected: false,
            },
          };
        }
      });
    default:
      return state;
  }
};

const undoableElements = undoable(elementReducer);

export default undoableElements;