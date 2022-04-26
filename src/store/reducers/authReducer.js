import * as actions from "../constants/authConstants";
import AuthService from "services/authService";

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
    case actions.MAKE_ME_ONLINE:
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

import { loginService, logoutService } from 'services/authService';
import { getMeService } from "services/authService";
import { mainNamespace } from "SocketConnections";

export const loginSuccess = (user) => async dispatch => {
  try {
    const { data } = await AuthService.logIn(user);
    dispatch({
      type: actions.LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch(loginError(error.response?.data.message));
  }
};
export const getMe = (token) => async dispatch => {
  try {
    const { user } = await AuthService.getMe(token);
    dispatch({
      type: actions.LOGIN_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch(loginError(error.response?.data.message));
  }
};
export const loginError = (error) => {
  return {
    type: actions.LOGIN_ERROR,
    payload: error,
  };
};
export const logOut = () => {
  mainNamespace.disconnect();
  AuthService.logOut();
  return {
    type: actions.LOG_OUT,
  };
};
export const makeMeOnline = (data) => {
  return {
    type: actions.MAKE_ME_ONLINE,
    payload: data
  };
};
