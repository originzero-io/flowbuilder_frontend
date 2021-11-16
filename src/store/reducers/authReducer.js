import * as actions from "../constants/authConstants";

const initialState = {
  username: "",
  role: "user",
  isAuthenticated: false,
  error: false,
  errorMessage: "",
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.LOGIN_SUCCESS:
      return {
        ...payload,
        isAuthenticated: true,
        error: false,
        errorMessage: "",
      };
    case actions.LOGIN_ERROR:
      return {
        error: true,
        isAuthenticated: false,
        errorMessage: payload,
      };
    case actions.LOG_OUT:
      return {
        user: "",
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
export default authReducer;

import { logoutService } from '../../services/authService';
export const loginSuccess = (user) => {
  return {
    type: actions.LOGIN_SUCCESS,
    payload: user,
  };
};
export const loginError = (error) => {
  return {
    type: actions.LOGIN_ERROR,
    payload: error,
  };
};
export const logOut = () => {
  logoutService();
  return {
    type: actions.LOG_OUT,
  };
};
