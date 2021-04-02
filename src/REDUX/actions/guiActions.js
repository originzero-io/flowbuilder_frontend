import * as action from "../constants/guiConstants";

export const setTheme = (data) => ({
  type: action.SET_THEME,
  payload: data
});
export const setFlagColor = (data) => ({
  type: action.SET_FLAG_COLOR,
  payload: data
});
export const setAlignAll = (data) => ({
  type: action.SET_ALIGN_ALL,
  payload: data
});
