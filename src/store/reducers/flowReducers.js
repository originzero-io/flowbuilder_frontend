import * as actions from "../constants/flowConstants";
import NodeClass from "../../app-global/works/NodeClass";
const nodeClass = new NodeClass("nodeClass is created by redux store");

const nodeGroups = [
  {
    id: 1,
    name: "Group 1",
    color: "#2ecc71",
  },
  {
    id: 2,
    name: "Group 2",
    color: "#2980b9",
  },
  {
    id: 3,
    name: "Group 3",
    color: "#f39c12",
  },
  {
    id: 4,
    name: "Group 4",
    color: "#6c5ce7",
  },
  {
    id: 5,
    name: "Group 5",
    color: "tomato",
  },
];
const flowTemplate = {
  workspace: {
    reactFlowInstance: null,
    position: [0,0],
    zoom:1,
    rotateAllPath: "horizontal",
    miniMapDisplay: "visible",
    groupBarDisplay: "hidden",
    edgeType: "bezier",
    theme: "light",
    nodeGroupMenuDisplay: false,
    paneClickPosition: { x: 0, y: 0 },
  },
  elements: [],
  groups: nodeGroups,
}
const flows = [
  {
    config: {
      id: "flow0",
      name: "flow1",
      author: "Anaks",
      description: "Bir ihtimal daha var",
      company: "Star Metal",
      createdDate: "05-06-2021 10.15",
      projectId: "project0",
    },
    ...flowTemplate
  },
];

export const flowReducer = (state = flows, { type, payload }) => {
  switch (type) {
    case actions.ADD_FLOW:
      return [...state, { config: { ...payload }, ...flowTemplate }];
    case actions.UPDATE_FLOW:
      return state;
    case actions.DELETE_FLOW:
      return state.filter(state=>state.config.id !== payload.id)
    case actions.MERGE_FLOW:
      return state.map(state => {
        if (state.config.id === payload.config.id) {
          return payload
        }
        else return state;
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
      return {...state, paneClickPosition: payload };
    case actions.SET_REACT_FLOW_INSTANCE:
      return {...state, reactFlowInstance: payload };
    case actions.SET_THEME:
      return {...state, theme: payload };
    case actions.SET_MINIMAP_DISPLAY:
      return {...state, miniMapDisplay: payload };
    case actions.SET_ROTATE_ALL_PATH:
      return {...state, rotateAllPath: payload };
    case actions.SET_WORKSPACE_EDGE_TYPE:
      return {...state, edgeType: payload };
    case actions.SET_GROUPBAR_DISPLAY:
      return { ...state, groupBarDisplay: payload };
      case actions.SET_CLOSE_ALL_GROUPS:
        return {...state,nodeGroupMenuDisplay:payload}
    default:
      return state;
  }
};

export const activeFlowReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actions.SET_ACTIVE_FLOW:
      return payload;
    default:
      return state;
  }
};


