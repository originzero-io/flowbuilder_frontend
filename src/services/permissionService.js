import axios from "axios";
import { store } from "index";
export const getAllPermissionsService = async () => {
  const response = await axios.get("/permissions/all");
  return response.data;
};
export const getUserPermissionInThisWorkspaceService = async (workspaceId,userId) => {
    const response = await axios.get(`/permissions/${workspaceId}/${userId}`);
    return response.data;
};
export const savePermissionService = async (permission) => {
    const response = await axios.post("/permissions/save",permission);
    return response.data;
};

export const getPresetsService = async () => {
  const response = await axios.get("/permissions/preset/all");
  return response.data;
};

export const savePresetService = async (preset) => {
    console.log("store:", store);
    const { auth,workspaces } = store.getState();

    const data = {
        workspaceId: workspaces.activeWorkspace._id,
        createdBy: auth._id,
        ...preset
  }
  const response = await axios.post("/permissions/preset/save",data);
  return response.data;
};
