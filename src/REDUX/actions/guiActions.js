import * as action from "../constants/guiConstants";

export const setTheme = (data) => ({
  type: action.SET_THEME,
  payload: data
});
export const setFlagColor = (data) => ({
  type: action.SET_FLAG_COLOR,
  payload: data
});
export const closeAllNodeGroupMenu = (data) => ({
  type: action.SET_CLOSE_ALL_GROUPS,
  payload: data
});