import * as actions from "../constants/componentContants";

const initialState = {
  active: false,
  component: null,
};

export const modalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SET_MODAL:
      return {
        active: payload.active,
        component: payload.component,
      };
    default:
      return state;
  }
};
