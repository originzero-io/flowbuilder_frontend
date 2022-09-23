import AuthService from "services/authService";
import UserService from "services/configurationService/userService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk("users/getAll", async () => {
  const users = await UserService.getAllUsers();
  return users;
});
export const createUser = createAsyncThunk("users/create", async (userInfo) => {
  const user = await AuthService.createUser(userInfo);
  return user;
});
export const editUser = createAsyncThunk("users/edit", async (userInfo) => {
  const user = await UserService.editUser(userInfo);
  return user;
});
export const addUserToWorkspace = createAsyncThunk(
  "users/add_to_workspace",
  async ({ userInfo, workspace }) => {
    const user = await UserService.addUserToWorkspace(userInfo, workspace);
    return user;
  }
);
export const removeUserToWorkspace = createAsyncThunk(
  "users/remove_from_workspace",
  async ({ userInfo, workspace }) => {
    const user = await UserService.removeUserToWorkspace(
      userInfo,
      workspace
    );
    return user;
  }
);
export const deleteUser = createAsyncThunk("users/delete", async (user) => {
  await UserService.deleteUser(user);
  return user;
});

export const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setActiveProject(state, { payload }) {
      state.activeProject = payload;
    },
  },
  extraReducers: {
    [getAllUsers.fulfilled]: (state, { payload }) => {
      return payload;
    },
    [createUser.fulfilled]: (state, { payload }) => {
      state.push(payload);
    },
    [editUser.fulfilled]: (state, { payload }) => {
      const index = state.findIndex((user) => user._id === payload._id);
      state[index] = payload
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      return state.filter((user) => user._id !== payload._id);
    },
    [addUserToWorkspace.fulfilled]: (state, { payload }) => {
      const index = state.findIndex((user) => user._id === payload._id);
      state[index] = payload
    },
    [removeUserToWorkspace.fulfilled]: (state,  {payload }) => {
      const index = state.findIndex((user) => user._id === payload._id);
      state[index] = payload
    },
  },
});

export default userSlice.reducer;
