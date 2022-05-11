import notification from "utils/notificationHelper";
import AuthService from "services/authService";
import UserService from "services/configurationService/userService";
import * as actions from "../constants/userContants";
const userReducer = (state = [], { type, payload }) => {
  switch (type) {
    case actions.GET_ALL_USERS:
      return payload;
    case actions.CREATE_USER:
      return [...state, payload];
    case actions.EDIT_USER:
      return state.map((state) => {
        if (state._id === payload._id) {
          return payload;
        } else return state;
      });
    case actions.DELETE_USER:
      return state.filter((state) => state._id !== payload._id);
    default:
      return state;
  }
};
export default userReducer;

export const getAllUsers = () => async (dispatch) => {
  const { users } = await UserService.getAllUsers();
  dispatch({
    type: actions.GET_ALL_USERS,
    payload: users,
  });
};
export const createUser = (userInfo) => async (dispatch) => {
  const { user } = await AuthService.createUser(userInfo);
  dispatch({
    type: actions.CREATE_USER,
    payload: user,
  });
};
export const editUser = (userInfo) => async (dispatch) => {
  const { user } = await UserService.editUser(userInfo);
  dispatch({
    type: actions.EDIT_USER,
    payload: user,
  });
};
export const addUserToWorkspace = (userInfo, workspace) => async (dispatch) => {
  const { user } = await UserService.addUserToWorkspace(userInfo, workspace);
  dispatch({
    type: actions.EDIT_USER,
    payload: user,
  });
};
export const removeUserToWorkspace =
  (userInfo, workspace) => async (dispatch) => {
    const { user } = await UserService.removeUserToWorkspace(
      userInfo,
      workspace
    );
    dispatch({
      type: actions.EDIT_USER,
      payload: user,
    });
  };
export const deleteUser = (user) => async (dispatch) => {
  try {
    await UserService.deleteUser(user);
    dispatch({
      type: actions.DELETE_USER,
      payload: user,
    });
  } catch (error) {
    notification.error(error.message);
  }
};
