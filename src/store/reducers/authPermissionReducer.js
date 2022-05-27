import PermissionService from "services/configurationService/permissionService";
import { beginTheBar,endTheBar } from "store/reducers/componentReducer";
import { defaultPermissions } from "./userPermissionReducer";

const authPermissionReducer = (state = defaultPermissions, { type, payload }) => {
  switch (type) {
    case "LOAD_MY_PERMISSION":
      return payload;
    default:
      return state;
  }
};
export default authPermissionReducer;

export const loadMyPermission = (data) => ({
  type: "LOAD_MY_PERMISSION",
  payload: data
});
  
export const getMyPermissionInThisWorkspace = (workspace, me) => async (dispatch) => {
  dispatch(beginTheBar());
  const { permission } = await PermissionService.getUserPermissionInThisWorkspace(workspace._id, me._id);
  if (permission) {
    dispatch(loadMyPermission(permission.permissions));
  }
  dispatch(endTheBar());
};