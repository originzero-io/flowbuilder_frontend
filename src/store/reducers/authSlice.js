import AuthService from "services/authService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServiceSocket from "services/configurationService/userService/userService.socket";
import workspaceServiceSocket from "services/configurationService/workspaceService/workspaceService.socket";
import projectServiceSocket from "services/configurationService/projectService/projectService.socket";
import flowServiceSocket from "services/configurationService/flowService/flowService.socket";
import noteServiceSocket from "services/configurationService/noteService/noteService.socket";
import flowElementServiceSocket from "services/configurationService/flowElementService/flowElementService.socket";

const initialState = {
  username: "",
  role: "user",
  isAuthenticated: false,
};

export const login = createAsyncThunk("auth/login", async (user) => {
  const { data } = await AuthService.logIn(user);
  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    makeMeOnline(state, { payload }) {
      state.isAuthenticated = true;
    },
    logOut(state, { payload }) {
      AuthService.logOut();

      state.user = "";
      state.isAuthenticated = false;

      userServiceSocket.disconnect();
      workspaceServiceSocket.disconnect();
      projectServiceSocket.disconnect();
      flowServiceSocket.disconnect();
      noteServiceSocket.disconnect();
      flowElementServiceSocket.disconnect();
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) =>
      (state = {
        ...payload,
        isAuthenticated: true,
      }),
    [login.rejected]: (state, { payload }) => {
      state.isAuthenticated = false;
    },
  },
});
export const { makeMeOnline, logOut } = authSlice.actions;
export default authSlice.reducer;
