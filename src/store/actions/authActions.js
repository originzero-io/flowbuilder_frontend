import * as action from "../constants/authConstants";
import { logoutService } from '../../services/authService';
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
  logoutService();
  return {
    type: action.LOG_OUT,
  };
};
