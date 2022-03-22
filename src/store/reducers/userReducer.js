import {
  addUserToWorkspaceService,
  assignPermissionToMemberService,
  deleteUserService,
  editUserService,
  getAllUsersService,
  registerService,
  removeUserToWorkspaceService,
} from "services/userService";
import * as actions from "../constants/userContants";
import toast from "react-hot-toast";
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
  const { users } = await getAllUsersService();
  dispatch({
    type: actions.GET_ALL_USERS,
    payload: users,
  });
};
export const registerUser = (userInfo) => async (dispatch) => {
  const { user } = await registerService(userInfo);
  dispatch({
    type: actions.CREATE_USER,
    payload: user,
  });
};
export const editUser = (userInfo) => async (dispatch) => {
  const { user } = await editUserService(userInfo);
  dispatch({
    type: actions.EDIT_USER,
    payload: user,
  });
};
export const addUserToWorkspace = (userInfo,workspace) => async (dispatch) => {
  const { user } = await addUserToWorkspaceService(userInfo, workspace);
  dispatch({
    type: actions.EDIT_USER,
    payload: user,
  });
};
export const removeUserToWorkspace = (userInfo, workspace) => async (dispatch) => {
  const { user } = await removeUserToWorkspaceService(userInfo, workspace);
  dispatch({
    type: actions.EDIT_USER,
    payload: user,
  });
};
export const assignPermissionToMember = (member,workspace,permissions) => async (dispatch) => {
  const {user} = await assignPermissionToMemberService(member, workspace, permissions);
  console.log(user);
  dispatch({
    type: actions.EDIT_USER,
    payload: user,
  });
};
export const deleteUser = (user) => async (dispatch) => {
  try {
    await deleteUserService(user);
    dispatch({
      type: actions.DELETE_USER,
      payload: user,
    });
    
  } catch (error) {
    toast.error(error.message);
  }
};
