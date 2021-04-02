import * as actionTypes from "../constants/guiConstants";

export const themeReducer = (state = "dark", action) => {
  switch (action.type) {
    case actionTypes.SET_THEME:
      return action.payload;
    default:
      return state;
  }
};

export const flagColorReducer = (state = "rgb(44,206,166)", action) => {
  switch (action.type) {
    case actionTypes.SET_FLAG_COLOR:
      return action.payload;
    default:
      return state;
  }
};

export const alignAllReducer = (state = "vertical", action) => {
  switch (action.type) {
    case actionTypes.SET_ALIGN_ALL:
      return action.payload;
    default:
      return state;
  }
};