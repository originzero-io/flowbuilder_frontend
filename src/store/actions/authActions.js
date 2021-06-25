import * as action from "../constants/authConstants";

export const loginSuccess = (user) => {
  return {
    type: action.LOGIN_SUCCESS,
    payload: user,
  };
};
export const loginError = (error) => {
  return {
    type: action.LOGIN_ERROR,
    payload: error,
  };
};
export const logOut = () => {
  return {
    type: action.LOG_OUT,
  };
};
