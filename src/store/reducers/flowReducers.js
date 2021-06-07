import * as actionTypes from "../constants/flowConstants";
import NodeClass from "../../app-global/works/NodeClass";
const nodeClass = new NodeClass("nodeClass is created by redux store");
const flowConfig = {
  reactFlowInstance: null,
  zoom: 0,
  rotateAllPath: "horizontal",
  miniMapDisplay: "visible",
  groupBarDisplay: "hidden",
  edgeType: "bezier",
  clickedElement: {},
  copiedElements: [],
  paneClickPosition: { x: 0, y: 0 },
};
//eslint-disable-next-line
export const nodeClassReducer = (state = nodeClass, action) => {
  return state;
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
    case actionTypes.SET_EDGE_TYPE:
      return { ...state, edgeType: action.payload };
    case actionTypes.SET_COPIED_ELEMENTS:
      return { ...state, copiedElements: action.payload };
    case actionTypes.SET_PANE_CLICK_POSITION:
      return {
        ...state,
        paneClickPosition: { x: action.payload.x, y: action.payload.y },
      };
    default:
      return state;
  }
};

const activeFlows = ["1234", "13569"]
const flows = [
  {
    config: {
      id: "1234",
      name: "flow1",
      author: "Anaks",
      createdDate: "05-06-2021 10.15",
      project: "Project 1",
    },
    gui: {
      reactFlowInstance: null,
      zoom: 0,
      rotateAllPath: "horizontal",
      miniMapDisplay: "visible",
      groupBarDisplay: "hidden",
      edgeType: "bezier",
      clickedElement: {},
      copiedElements: [],
      paneClickPosition: { x: 0, y: 0 },
      theme: "light",
      nodeGroupMenuDisplay: false,
    },
    elements: [],
    groups:[]
  },
  {
    config: {
      id: "13569",
      name: "flow1",
      author: "Anaks",
      createdDate: "05-06-2021 10.15",
      project: "Project 1",
    },
    gui: {
      reactFlowInstance: null,
      zoom: 0,
      rotateAllPath: "horizontal",
      miniMapDisplay: "visible",
      groupBarDisplay: "hidden",
      edgeType: "bezier",
      clickedElement: {},
      copiedElements: [],
      paneClickPosition: { x: 0, y: 0 },
      theme: "light",
      nodeGroupMenuDisplay: false,
    },
    elements: [],
  },
];

export const flowReducer = (state = flows, action) => {
  switch (action.type) {
    case "action":
      return state;
    default:
      return state;
  }
};