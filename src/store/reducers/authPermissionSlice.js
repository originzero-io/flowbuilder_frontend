import PermissionService from "services/configurationService/permissionService";
import { beginTheBar,endTheBar } from "store/reducers/componentSlice";
import { defaultPermissions } from "./userPermissionSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
  
export const getMyPermissionInThisWorkspace = createAsyncThunk("authPermission/getMyPermissionsInThisWorkspace", async ({workspace, me}) => {
  beginTheBar();
  const { permission } = await PermissionService.getUserPermissionInThisWorkspace(workspace._id, me._id);
  endTheBar();
  return permission;
});
export const authPermissionSlice = createSlice({
  name: "authPermission",
  initialState: defaultPermissions,
  extraReducers: {
    [getMyPermissionInThisWorkspace.fulfilled]: (state, { payload }) => {
      if (payload) {
        return payload.permissions;
      }
    }
  },
});


export default authPermissionSlice.reducer;
