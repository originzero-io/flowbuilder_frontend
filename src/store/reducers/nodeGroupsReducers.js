import * as actionTypes from "../constants/nodeGroupsContants";
const nodeGroups = [
  {
    id: 1,
    name: "group_1",
    color: "#2ecc71",
  },
  {
    id: 2,
    name: "group_2",
    color: "#2980b9",
  },
  {
    id: 3,
    name: "group_3",
    color: "#f39c12",
  },
  {
    id: 4,
    name: "group_4",
    color: "#6c5ce7",
  },
  {
    id: 5,
    name: "group_5",
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
    default:
      return state;
  }
};
