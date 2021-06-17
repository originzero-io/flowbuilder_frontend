import * as actionTypes from "../constants/nodeGroupsContants";
import { nodeGroups } from "../initialValues";

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
