import * as actions from "../../constants/flowConstants";
import NodeClass from "../../../app-global/works/NodeClass";
const nodeClass = new NodeClass("nodeClass is created by redux store");
export const flowReducer = (state = [], { type, payload }) => {
  switch (type) {
    case actions.ADD_FLOW:
      return [...state, payload];
    case actions.OPEN_FLOW:
      return state.map((state) => {
        if (state._id === payload._id) {
          return {
            ...state,
            opened: true,
          };
        } else return state;
      });
    case actions.CLOSE_FLOW:
      return state.map((state) => {
        if (state._id === payload._id) {
          return {
            ...state,
            opened: false,
          };
        } else return state;
      });
    case actions.DELETE_FLOW:
      return state.filter((state) => state._id !== payload._id);
    case actions.MERGE_FLOW:
      return state.map((state) => {
        if (state._id === payload._id) {
          console.log(payload);
          return { ...state, ...payload };
        } else return state;
      });
    case actions.LOAD_FLOWS:
      return payload;
    case actions.UPDATE_FLOW:
      return state.map((state) => {
        if (state._id === payload._id) {
          return payload;
        } else return state;
      });
    default:
      return state;
  }
};
//eslint-disable-next-line
export const nodeClassReducer = (state = nodeClass, action) => {
  return state;
};

export const flowConfigReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actions.SET_CURRENT_FLOW_CONFIG:
      return payload;
    case "update_name":
      return state;
    case "update_company":
      return state;
    default:
      return state;
  }
};
export const flowWorkSpaceReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actions.SET_CURRENT_FLOW_WORKSPACE:
      return payload;
    case actions.SET_PANE_CLICK_POSITION:
      return { ...state, paneClickPosition: payload };
    case actions.SET_REACT_FLOW_INSTANCE:
      return { ...state, reactFlowInstance: payload };
    case actions.SET_THEME:
      return { ...state, theme: payload };
    case actions.SET_MINIMAP_DISPLAY:
      return { ...state, miniMapDisplay: payload };
    case actions.SET_ROTATE_ALL_PATH:
      return { ...state, rotateAllPath: payload };
    case actions.SET_WORKSPACE_EDGE_TYPE:
      return { ...state, edgeType: payload };
    case actions.SET_GROUPBAR_DISPLAY:
      return { ...state, groupBarDisplay: payload };
    case actions.SET_CLOSE_ALL_GROUPS:
      return { ...state, nodeGroupMenuDisplay: payload };
    default:
      return state;
  }
};
