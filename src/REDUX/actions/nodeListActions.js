import * as action from "../constants/nodeListConstants";

export const setNodeList = (data) => ({
  type: action.SET_NODE_LIST,
  payload: data
});
export const addNodeToFavorites = (node) => ({
  type: action.ADD_NODE_TO_FAVORITES,
  payload: node
});
