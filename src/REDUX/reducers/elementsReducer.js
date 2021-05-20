import * as actionTypes from "../constants/elementsContants";
import undoable from "redux-undo"
const elementReducer = (state = [], { type, payload }) => {
  switch (type) {
    case actionTypes.SET_ELEMENTS:
      return payload;
    case actionTypes.IMPORT_ELEMENTS:
      return [...state, ...payload];
    case actionTypes.SET_ROTATE_ALL:
      return state.map((state) => {
        return {
          ...state,
          data: {
            ...state.data,
            align: payload,
          },
        };
      });
    case actionTypes.SET_EXPAND_ALL:
      return state.map((state) => {
        return {
          ...state,
          data: {
            ...state.data,
            expand: payload,
          },
        };
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
    default:
      return state;
  }
};

const undoableElements = undoable(elementReducer);

export default undoableElements;