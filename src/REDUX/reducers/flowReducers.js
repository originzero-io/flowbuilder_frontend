import * as actionTypes from "../constants/flowConstants";
import NodeClass from "../../globals/works/NodeClass";
const nodeClass = new NodeClass("nodeClass was created by redux store");
const initialElements = [];

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
export const reactFlowInstanceReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_REACT_FLOW_INSTANCE:
      console.log("set_reactflow_action", action.payload);
      return action.payload;
    default:
      return state;
  }
};
export const clickedElementReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_CLICKED_ELEMENT:
      return action.payload;
    default:
      return state;
  }
};
export const miniMapDisplayReducer = (state = "visible", action) => {
  switch (action.type) {
    case actionTypes.SET_MINIMAP_DISPLAY:
      return action.payload;
    default:
      return state;
  }
};
