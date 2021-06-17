import * as actionTypes from "../constants/nodeListConstants";
import { panelNodeList } from "../initialValues";
export const nodeListReducer = (state = panelNodeList, {type,payload}) => {
  switch (type) {
    case actionTypes.SET_NODE_LIST:
      return payload;
    case actionTypes.ADD_NODE_TO_FAVORITES:
      return state.map(state=>state.id === payload.id ? {...state,fav:!state.fav} : state);
    default:
      return state;
  }
};
