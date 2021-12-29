import * as actions from "../constants/componentContants";

const initialState = null;

export const modalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SET_MODAL:
      return payload
    default:
      return state;
  }
};

export const setModal = (component) => {
  return {
    type: actions.SET_MODAL,
    payload: component,
  };
};