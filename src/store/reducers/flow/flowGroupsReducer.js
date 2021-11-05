import * as actionTypes from "../../constants/nodeGroupsContants";

const flowGroupsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case actionTypes.LOAD_GROUPS:
      return payload;
    case actionTypes.ADD_GROUP:
      return [...state, payload];
    case actionTypes.UPDATE_GROUP:
      return state.map(state=>state._id === payload._id ? payload : state);
    case actionTypes.DELETE_GROUP:
      return state.filter(state=>state._id !== payload._id);
    default:
      return state;
  }
};
export default flowGroupsReducer;