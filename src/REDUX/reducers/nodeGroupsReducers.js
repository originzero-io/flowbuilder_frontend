import * as actionTypes from "../constants/nodeGroupsContants";
const nodeGroups = [
  {
    id: 1,
    name: "group_1",
    nodes: [],
    color: "#2ecc71",
  },
  {
    id: 2,
    name: "group_2",
    nodes: [],
    color: "#2980b9",
  },
  {
    id: 3,
    name: "group_3",
    nodes: [],
    color: "#f39c12",
  },
  {
    id: 4,
    name: "group_4",
    nodes: [],
    color: "#6c5ce7",
  },
  {
    id: 5,
    name: "group_5",
    nodes: [],
    color: "#32cdae",
  },
  {
    id: 6,
    name: "group_6",
    nodes: [],
    color: "tomato",
  },
];
export const nodeGroupsReducer = (state = nodeGroups, { type, payload }) => {
  switch (type) {
    case actionTypes.LOAD_GROUPS:
      return payload;
    case actionTypes.ADD_GROUP:
      return [...state, payload];
    case actionTypes.UPDATE_GROUP:
      return state.map(state=>state.id === payload.id ? payload : state);
    case actionTypes.DELETE_GROUP:
      return state.filter(state=>state.id !== payload);
    case actionTypes.ADD_NODE_TO_GROUP_SINGLE:
      return state.map(state => state.id === payload.group.id ? {...state, nodes:[...state.nodes,payload.self]} : state)
    case actionTypes.ADD_NODE_TO_GROUP_MULTIPLE:
      return state.map(state => state.id === payload.group.id ? {...state, nodes:[...state.nodes,...payload.selected]} : state)
    case actionTypes.DELETE_NODE_CURRENT_GROUP:
      return state.map(state=>state.id === payload.data.group.id ? {...state,nodes:state.nodes.filter(node=>node.id !== payload.id)} : state)
    default:
      return state;
  }
};
