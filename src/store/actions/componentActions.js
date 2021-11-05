import * as action from "../constants/componentContants";
export const setModal = (active,component) => {
  return {
    type: action.SET_MODAL,
    payload: { active, component },
  };
};