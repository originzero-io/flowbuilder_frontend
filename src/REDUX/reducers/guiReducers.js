import * as actionTypes from "../constants/guiConstants";

const guiConfig = {
  theme: "dark",
  flagColor: "rgb(44,206,166)",
  alignAll: "horizontal",
  closeAllGroupMenu:false
}
export const guiConfigReducer = (state=guiConfig, action) => {
  switch (action.type) {
    case actionTypes.SET_THEME:
      return {...state,theme:action.payload}
    case actionTypes.SET_FLAG_COLOR:
      return {...state,flagColor:action.payload}
    case actionTypes.SET_ALIGN_ALL:
      return {...state,alignAll:action.payload}
    case actionTypes.SET_CLOSE_ALL_GROUPS:
      return {...state,closeAllGroupMenu:action.payload}
    default:
      return state;
  }
}