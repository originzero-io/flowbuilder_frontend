import * as actionTypes from "../constants/flowConstants";
import NodeClass from "../../app-global/works/NodeClass";
const nodeClass = new NodeClass("nodeClass was created by redux store");
const initialElements = [];
const flowConfig = {
  reactFlowInstance: null,
  miniMapDisplay: "visible",
  groupBarDisplay:"hidden",
  clickedElement: {},
};

export const nodeClassReducer = (state = nodeClass, action) => {
  return state;
};
export const elementReducer = (state = initialElements, action) => {
  switch (action.type) {
    case actionTypes.SET_ELEMENTS:
      return action.payload;
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
    default:
      return state;
  }
};
