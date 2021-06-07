import * as actionTypes from "../constants/guiConstants";

const guiConfig = {
  theme: "light",
  nodeGroupMenuDisplay: true,
}
export const guiConfigReducer = (state=guiConfig, action) => {
  switch (action.type) {
    case actionTypes.SET_THEME:
      return {...state,theme:action.payload}
    case actionTypes.SET_FLAG_COLOR:
      return {...state,flagColor:action.payload}
    case actionTypes.SET_CLOSE_ALL_GROUPS:
      return {...state,nodeGroupMenuDisplay:action.payload}
    default:
      return state;
  }
}