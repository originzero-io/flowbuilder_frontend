import * as actionTypes from "../constants/flowConstants";
import NodeClass from "../../app-global/works/NodeClass";
const nodeClass = new NodeClass("nodeClass was created by redux store");
const initialElements = [];
const flowConfig = {
  reactFlowInstance: null,
  zoom: 0,
  rotateAllPath:"horizontal",
  miniMapDisplay: "visible",
  groupBarDisplay:"hidden",
  clickedElement: {},
};

export const nodeClassReducer = (state = nodeClass, action) => {
  return state;
};
export const elementReducer = (state = initialElements, {type,payload}) => {
  switch (type) {
    case actionTypes.SET_ELEMENTS:
      return payload;
    case actionTypes.SET_ROTATE_ALL:
      return state.map(state => {
        return {
          ...state,
          data: {
            ...state.data,
            align: payload
          }
        }
      });
    case actionTypes.SET_EXPAND_ALL:
      return state.map(state => {
        return {
          ...state,
          data: {
            ...state.data,
            expand: payload
          }
        }
      });
    case actionTypes.ROTATE_NODE:
      return state.map(state => {
        if (state.id === payload.self.id) {
          return {
            ...state,
            data: {
              ...state.data,
              align:payload.path
            }
          }
        }
        return state;
      });
    case actionTypes.ROTATE_MULTI_NODE:
      return state.map(state => {
        if (payload.selectedIDArray.includes(state.id)) {
          return {
            ...state,
            data: {
              ...state.data,
              align:payload.path
            }
          }
        }
        return state;
      });
    case actionTypes.EXPAND_NODE:
      return state.map(state => {
        if (state.id === payload.self.id) {
          return {
            ...state,
            data: {
              ...state.data,
              expand:!payload.self.data.expand
            }
          }
        }
        return state;
      });
    default:
      return state;
  }
};
export const flowConfigReducer = (state = flowConfig, action) => {
  switch (action.type) {
    case actionTypes.SET_REACT_FLOW_INSTANCE:
      return { ...state, reactFlowInstance: action.payload };
    case actionTypes.SET_MINIMAP_DISPLAY:
      return { ...state, miniMapDisplay: action.payload };
    case actionTypes.SET_GROUPBAR_DISPLAY:
      return { ...state, groupBarDisplay: action.payload };
    case actionTypes.SET_CLICKED_ELEMENT:
      return { ...state, clickedElement: action.payload };
    case actionTypes.SET_ZOOM:
      return { ...state, zoom: action.payload };
    case actionTypes.SET_ROTATE_ALL_PATH:
      return { ...state, rotateAllPath: action.payload };
    default:
      return state;
  }
};
