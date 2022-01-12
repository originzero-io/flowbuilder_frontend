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
export const loadingBarReducer = (state = { progress: 0 }, { type, payload }) => {
  switch (type) {
    case actions.SET_PROGRESS:
      return {...state,progress:payload}
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
export const setLoadingBarProgress = (number) => {
  return {
    type: actions.SET_PROGRESS,
    payload: number,
  };
};

export const beginTheBar = () => dispatch => {
  let i = Math.floor(Math.random() * 40) + 10
  dispatch(setLoadingBarProgress(i))
}

export const endTheBar = () => dispatch => {
  dispatch(setLoadingBarProgress(100))
}