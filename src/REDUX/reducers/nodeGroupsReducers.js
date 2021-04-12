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
];
export const nodeGroupsReducer = (state = nodeGroups, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_GROUP:
      return [...state, payload];
    case actionTypes.UPDATE_GROUP:
      return [...state, payload];
    case actionTypes.DELETE_GROUP:
      return state.filter(s=>s.id !== payload);
    case actionTypes.ADD_NODE_TO_GROUP:
      return payload;
    default:
      return state;
  }
};
