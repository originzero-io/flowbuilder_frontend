import * as actionTypes from "../constants/menuConstants";

const initialState = {
    state: false,
    x: 0,
    y: 0,
    element:{}
  }

export const panelMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PANEL_CONTEXT:
      return action.payload;
    default:
      return state;
  }
};

export const multiSelectionMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MULTISELECTION_CONTEXT:
      return action.payload;
    default:
      return state;
  }
};

export const elementMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ELEMENT_CONTEXT:
      return action.payload;
    default:
      return state;
  }
};
